/**
 * Analytics integration for the portfolio website.
 * Sends events to the Real-Time Event Processing & Analytics Platform.
 *
 * Configure via environment variables in .env:
 *   VITE_ANALYTICS_ENDPOINT=https://your-analytics-server.com
 *   VITE_ANALYTICS_API_KEY=ra_...
 */

interface TrackEvent {
    event_type: "track" | "page" | "identify";
    event_name: string;
    user_id?: string;
    session_id?: string;
    properties?: Record<string, unknown>;
    timestamp?: string;
    context?: Record<string, unknown>;
}

class PortfolioAnalytics {
    private readonly endpoint: string;
    private readonly apiKey: string;
    private readonly sessionId: string;
    private queue: TrackEvent[] = [];
    private timer: ReturnType<typeof setInterval> | null = null;
    private enabled: boolean;

    constructor() {
        this.endpoint = (import.meta.env.VITE_ANALYTICS_ENDPOINT as string) || "";
        this.apiKey = (import.meta.env.VITE_ANALYTICS_API_KEY as string) || "";
        this.enabled = Boolean(this.endpoint && this.apiKey);
        this.sessionId = this.generateSessionId();

        if (this.enabled) {
            this.startFlushTimer();
            window.addEventListener("beforeunload", () => this.flush());
            console.log("[Analytics] Initialized");
        }
    }

    /** Track a page view */
    pageView(): void {
        this.enqueue({
            event_type: "page",
            event_name: "page_view",
            properties: {
                url: window.location.href,
                path: window.location.pathname,
                referrer: document.referrer || undefined,
                title: document.title,
                screen_width: window.innerWidth,
                screen_height: window.innerHeight,
                user_agent: navigator.userAgent,
            },
        });
    }

    /** Track a terminal command executed by the visitor */
    trackCommand(command: string, isValid: boolean): void {
        this.enqueue({
            event_type: "track",
            event_name: "terminal_command",
            properties: {
                command,
                is_valid: isValid,
            },
        });
    }

    /** Track when a user clicks an external link */
    trackLinkClick(label: string, url: string): void {
        this.enqueue({
            event_type: "track",
            event_name: "link_click",
            properties: { label, url },
        });
    }

    /** Track a generic custom event */
    track(eventName: string, properties?: Record<string, unknown>): void {
        this.enqueue({
            event_type: "track",
            event_name: eventName,
            properties: properties || {},
        });
    }

    // --- Private ---

    private enqueue(event: TrackEvent): void {
        if (!this.enabled) return;

        this.queue.push({
            ...event,
            session_id: this.sessionId,
            timestamp: new Date().toISOString(),
            context: {
                locale: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
        });

        // Auto-flush if queue gets large
        if (this.queue.length >= 20) {
            this.flush();
        }
    }

    private async flush(): Promise<void> {
        if (this.queue.length === 0) return;

        const events = [...this.queue];
        this.queue = [];

        try {
            const response = await fetch(`${this.endpoint}/v1/events/batch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": this.apiKey,
                },
                body: JSON.stringify({ events }),
                keepalive: true, // ensures request completes even on page unload
            });

            if (!response.ok) {
                // Re-queue on failure
                this.queue.unshift(...events);
                console.warn("[Analytics] Flush failed:", response.status);
            }
        } catch {
            // Re-queue on network error
            this.queue.unshift(...events);
        }
    }

    private startFlushTimer(): void {
        this.timer = setInterval(() => this.flush(), 5000);
    }

    private generateSessionId(): string {
        return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    }
}

// Singleton instance
export const analytics = new PortfolioAnalytics();
