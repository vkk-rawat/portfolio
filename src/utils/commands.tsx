import type { ReactNode, Dispatch, SetStateAction } from "react";
import {
  FaCode,
  FaFire,
  FaGithub,
  FaGlobe,
  FaLightbulb,
  FaNpm,
  FaRocket,
} from "react-icons/fa";

interface CommandItem {
  command: string;
  output: ReactNode;
}

// Helper components for consistent styling
const Heading = ({ children }: { children: ReactNode }) => (
  <span className="text-terminal-accent font-semibold">{children}</span>
);

const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-terminal-link hover:underline"
  >
    {children}
  </a>
);

const Muted = ({ children }: { children: ReactNode }) => (
  <span className="text-terminal-muted">{children}</span>
);

// Commands data
const HELP_COMMANDS = [
  { cmd: "about", desc: "Learn more about me" },
  { cmd: "socials", desc: "Find me on the web" },
  { cmd: "skills", desc: "Check out my technical skills" },
  { cmd: "projects", desc: "View my projects" },
  { cmd: "experience", desc: "Explore my professional journey" },
  { cmd: "resume", desc: "Open my resume" },
  { cmd: "goals", desc: "Discover my aspirations" },
  { cmd: "blogs", desc: "Read my blog" },
  { cmd: "neofetch", desc: "Display system info" },
  { cmd: "ls", desc: "List available sections" },
  { cmd: "pwd", desc: "Print working directory" },
  { cmd: "whoami", desc: "Display current user" },
  { cmd: "date", desc: "Show current date/time" },
  { cmd: "uptime", desc: "Show session uptime" },
  { cmd: "history", desc: "Show command history" },
  { cmd: "echo <text>", desc: "Print text to terminal" },
  { cmd: "cat <file>", desc: "Display file contents" },
  { cmd: "man <cmd>", desc: "Show command manual" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "sudo rm -rf /*", desc: "⚠️ Try at your own risk!" },
];

const PROJECTS = [
  {
    name: "Flux Mail 🦀",
    desc: "A temp mail service with self-made SMTP server in Rust",
    link: "https://flux-mail.shubh.sh",
    github: "https://github.com/shubhexists/flux-mail",
    crate: "https://crates.io/crates/flux-mail",
  },
  {
    name: "Ved Analytics",
    desc: "Privacy-focused website analytics platform",
    link: "https://vedanalytics.in",
  },
  {
    name: "RDS 🦀",
    desc: "Discord music bot written in Rust and Serenity",
    github: "https://github.com/shubhexists/rds",
  },
  {
    name: "Vanish 🦀",
    desc: "Tool for locally trusted X.509 dev certificates (MKCERT alternative)",
    github: "https://github.com/shubhexists/vanish",
  },
  {
    name: "term_ansi 🦀",
    desc: "Rust macros for ANSI color coding in terminal",
    github: "https://github.com/shubhexists/term_ansi",
    crate: "https://crates.io/crates/term_ansi",
  },
  {
    name: "mlvm 🦀",
    desc: "Symlink-based nvm alternative written in Rust",
    github: "https://github.com/shubhexists/mlvm",
    crate: "https://crates.io/crates/mlvm",
  },
  {
    name: "Prism",
    desc: "Minimalist ExpressJS replica in TypeScript",
    github: "https://github.com/shubhexists/prism",
  },
  {
    name: "React Maps",
    desc: "Lightweight React map components (170k+ downloads)",
    github: "https://github.com/shubhexists/react-maps",
    npm: "https://www.npmjs.com/org/react-map",
  },
  {
    name: "Vault 🦀",
    desc: "Simplified version control system in Rust",
    github: "https://github.com/shubhexists/vault",
    crate: "https://crates.io/crates/vault",
  },
  {
    name: "libaddress",
    desc: "Multi-country address handling library",
    github: "https://github.com/shubhexists/libaddress",
    npm: "https://www.npmjs.com/package/libaddress",
  },
];

const EXPERIENCE = [
  {
    company: "Blazeswap",
    role: "Blockchain Engineer",
    location: "Remote, India",
    date: "Dec 2024 - Jul 2025",
    description: "Developed DEX on XION and blockchain products",
    achievements: [
      "Built Swap on XION using CosmWasm contracts",
      "Created Uniswap router contract deployed on Base Mainnet",
      "Achieved $100k+ swap volume in under 4 days",
    ],
    Icon: FaCode,
  },
  {
    company: "Dardoc",
    role: "Senior Engineer",
    location: "Remote, UAE",
    date: "Jan 2025 - Jul 2025",
    description: "Admin Panel and scalable backend APIs",
    achievements: [
      "Migrated from Azure Cognitive Search to Typesense",
      "Rebuilt admin panel from scratch",
    ],
    Icon: FaCode,
  },
  {
    company: "Tezda Inc",
    role: "Senior Backend Developer",
    location: "Remote, UK",
    date: "April 2024 - Jul 2025",
    description: "Advanced backend systems and RTC stack",
    achievements: [
      "Built RTC stack using Livekit on Kubernetes",
      "Developed notification backend with FCM",
    ],
    Icon: FaCode,
  },
  {
    company: "INDOTABI TOURS",
    role: "Full Stack Developer",
    location: "Delhi, India",
    date: "Sept 2022 - April 2024",
    description: "Japanese-language mobile-centric website",
    achievements: [
      "NextJS frontend + ExpressJS backend",
      "Launched indotabi.com",
    ],
    Icon: FaFire,
  },
  {
    company: "Zoomtod",
    role: "Product Developer",
    location: "Remote, US",
    date: "Jan 2022 - Sept 2022",
    description: "Voice-only WebRTC application",
    achievements: [
      "Flutter app on Play Store",
      "500+ users with 100+ daily active",
    ],
    Icon: FaRocket,
  },
  {
    company: "Vitalth Pvt. Ltd.",
    role: "Backend Developer",
    location: "Delhi, India",
    date: "Dec 2022 - Mar 2023",
    description: "UHI (Unified Health Interface) implementation",
    achievements: [
      "Implemented Govt. of India's UHI architecture",
      "Completed M1 and M2 onboarding phases",
    ],
    Icon: FaLightbulb,
  },
];

const sessionStart = Date.now();

export const getOutput = (
  command: string,
  setCommand: Dispatch<SetStateAction<CommandItem[]>>
): ReactNode => {
  const trimmed = command.trim();
  const lower = trimmed.toLowerCase();
  const args = trimmed.split(/\s+/).slice(1).join(" ");

  // Echo command
  if (lower.startsWith("echo ")) {
    return <span>{args}</span>;
  }

  // Cat command
  if (lower.startsWith("cat ")) {
    const file = args.toLowerCase();
    const files: Record<string, ReactNode> = {
      "about.txt": "Run 'about' for detailed info about me.",
      "readme.md": "# Vivek Rawat\nSenior Backend Engineer | Linux Enthusiast | Rust Developer",
      ".bashrc": "# ~/.bashrc\nexport PS1='\\u@\\h:\\w\\$ '\nalias ll='ls -la'",
    };
    return files[file] || <span className="text-terminal-error">cat: {args}: No such file or directory</span>;
  }

  // Man command
  if (lower.startsWith("man ")) {
    const cmd = args.toLowerCase();
    const manPages: Record<string, string> = {
      help: "help - Display available commands\n\nSYNOPSIS\n  help\n\nDESCRIPTION\n  Lists all available commands in the terminal.",
      about: "about - Display information about Vivek\n\nSYNOPSIS\n  about\n\nDESCRIPTION\n  Shows personal and professional information.",
      clear: "clear - Clear the terminal screen\n\nSYNOPSIS\n  clear\n\nDESCRIPTION\n  Clears all previous output from the terminal.",
    };
    return (
      <pre className="text-terminal-text whitespace-pre-wrap">
        {manPages[cmd] || `No manual entry for ${args}`}
      </pre>
    );
  }

  switch (lower) {
    case "":
      return null;

    case "sudo rm -rf /*": {
      const closeWindow = () => {
        window.open("about:blank", "_blank")?.close();
        window.close();
        window.location.href = "about:blank";
      };
      closeWindow();
      return <span className="text-terminal-error">Initiating system destruction...</span>;
    }

    case "pwd":
      return <span>/home/vivek</span>;

    case "whoami":
      return <span>vivek</span>;

    case "date":
      return <span>{new Date().toString()}</span>;

    case "uptime": {
      const seconds = Math.floor((Date.now() - sessionStart) / 1000);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return <span>Session uptime: {mins}m {secs}s</span>;
    }

    case "echo":
      return null;

    case "ls":
      return (
        <div className="flex flex-wrap gap-4 text-terminal-link">
          {["about", "socials", "skills", "projects", "experience", "goals", "resume", "blogs"].map((item) => (
            <span key={item}>{item}/</span>
          ))}
        </div>
      );

    case "blogs":
      window.open("https://blog.shubh.sh", "_blank");
      return <Muted>Opening blogs in a new tab...</Muted>;

    case "resume":
      window.open("https://shubh.sh/resume.pdf", "_blank");
      return <Muted>Opening resume in a new tab...</Muted>;

    case "clear":
      setCommand([]);
      return null;

    case "history":
      return <Muted>Use ↑ and ↓ arrow keys to navigate command history.</Muted>;

    case "neofetch":
      return (
        <pre className="text-terminal-text leading-relaxed">
          {`        .--.        vivek@rawat
       |o_o |       -----------
       |:_/ |       OS: Portfolio Terminal v1.0
      //   \\ \\      Host: React 19 + Vite
     (|     | )     Shell: /bin/portfolio
    /'\\_   _/\`\\     Theme: GitHub Dark
    \\___)=(___/     Terminal: Web Browser

                    Contact: shubh622005@gmail.com
                    GitHub: github.com/shubhexists`}
        </pre>
      );

    case "help":
      return (
        <div className="space-y-1">
          <p className="text-terminal-link mb-2">Available commands:</p>
          <div className="grid gap-1">
            {HELP_COMMANDS.map(({ cmd, desc }) => (
              <div key={cmd} className="flex">
                <span className="text-terminal-accent w-40 flex-shrink-0">{cmd}</span>
                <Muted>— {desc}</Muted>
              </div>
            ))}
          </div>
        </div>
      );

    case "about":
      return (
        <div className="space-y-3 max-w-2xl">
          <p>Hey there! Thanks for your interest in getting to know me better.</p>
          <p>
            I'm <Heading>Vivek Rawat</Heading>, 20, currently a Senior Backend Engineer at{" "}
            <Link href="https://www.dardoc.com">Dardoc</Link>.
          </p>
          <p>
            I'm a huge <Heading>Linux enthusiast</Heading> and absolutely love working in the{" "}
            <Heading>terminal</Heading>. My setup is minimalist — just my terminal, IDE, and browser!
          </p>
          <p>
            I'm passionate about building things and always eager to learn. When I'm not coding,
            you'll probably find me jamming to Bollywood tunes. <Heading>Indian music for the win!</Heading> 🎵
          </p>
        </div>
      );

    case "socials":
      return (
        <div className="space-y-3">
          <p className="text-terminal-muted">Social life? What's that? I live in a basement :) ...</p>
          <p>Here's where you can find me online:</p>
          <div className="space-y-1">
            {[
              { label: "GitHub", url: "https://github.com/shubhexists", text: "shubhexists" },
              { label: "X", url: "https://x.com/shubh_exists", text: "shubh_exists" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/shubhexists/", text: "Vivek Rawat" },
              { label: "Email", url: "mailto:shubh622005@gmail.com", text: "shubh622005@gmail.com" },
              { label: "Stack", url: "https://stackoverflow.com/users/21094470/shubham-singh", text: "stackoverflow.com/..." },
            ].map(({ label, url, text }) => (
              <div key={label} className="flex">
                <Heading>{label.padEnd(10)}</Heading>
                <Link href={url}>{text}</Link>
              </div>
            ))}
          </div>
          <p className="text-terminal-muted">Feel free to reach out! I'm most responsive on X/GitHub.</p>
        </div>
      );

    case "skills":
      return (
        <div className="space-y-3">
          {[
            { title: "Languages", items: "TypeScript, Rust, JavaScript, Python, Go, Dart, C, Java" },
            { title: "Frameworks", items: "React/NextJS, Express, Flutter, Actix Web, Rocket, Flask" },
            { title: "Blockchain", items: "Solana, Anchor, CosmWasm" },
            { title: "Tools", items: "Docker, Git, Prometheus, Grafana, Redis, Kafka, PostgreSQL, MongoDB" },
            { title: "DevOps", items: "Nginx, AWS (EC2, ECS, EKS, Lambda, S3, CloudWatch), Kubernetes" },
          ].map(({ title, items }) => (
            <div key={title}>
              <Heading>{title}:</Heading>
              <p className="text-terminal-muted ml-2">{items}</p>
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="space-y-4 mt-2">
          {PROJECTS.map((project, i) => (
            <div key={i} className="border border-terminal-border rounded-lg p-4 bg-terminal-bg">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-terminal-accent font-semibold">{project.name}</h3>
                  <p className="text-terminal-muted text-sm mt-1">{project.desc}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {project.crate && (
                    <a href={project.crate} target="_blank" rel="noopener noreferrer" title="Crates.io">
                      <img src="/cargo.png" alt="Cargo" className="w-5 h-5" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-terminal-link">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.npm && (
                    <a href={project.npm} target="_blank" rel="noopener noreferrer" className="text-red-500">
                      <FaNpm size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-terminal-link">
                      <FaGlobe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case "experience":
      return (
        <div className="space-y-6 mt-2">
          {EXPERIENCE.map((job, i) => (
            <div
              key={i}
              className="relative border border-terminal-border rounded-lg p-5 bg-gradient-to-r from-[#1a1b26] to-[#24283b]"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-terminal-accent text-3xl">
                  <job.Icon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h3 className="text-terminal-accent text-lg font-bold">{job.company}</h3>
                    <span className="text-terminal-muted text-sm">{job.date}</span>
                  </div>
                  <p className="text-terminal-link font-semibold">{job.role}</p>
                  <p className="text-terminal-muted text-sm">{job.location}</p>
                  <p className="text-terminal-muted mt-2">{job.description}</p>
                  <ul className="mt-3 space-y-1">
                    {job.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-terminal-accent">▹</span>
                        <span className="text-terminal-muted">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-terminal-accent to-terminal-error rounded-b-lg" />
            </div>
          ))}
        </div>
      );

    case "goals":
      return (
        <div className="space-y-3 max-w-2xl">
          <p>
            The future is full of possibilities, and I'm excited to explore them! Here are some
            guiding principles:
          </p>
          <ul className="list-disc list-inside text-terminal-muted space-y-1">
            <li>
              Pursue projects that bring <Heading>happiness</Heading> and fulfillment
            </li>
            <li>
              Be part of <Heading>impactful initiatives</Heading> making a difference
            </li>
            <li>
              Explore <Heading>AI</Heading>, <Heading>Space Tech</Heading>,{" "}
              <Heading>Nuclear Energy</Heading>, and <Heading>Hydroponics</Heading>
            </li>
          </ul>
          <p className="text-terminal-muted">
            I'm open to wherever passion and opportunities lead me. That's the beauty of life!
          </p>
        </div>
      );

    default:
      return (
        <div>
          <span className="text-terminal-error">
            Command not found: {trimmed}
          </span>
          <br />
          <span className="text-terminal-muted">
            Type <span className="text-terminal-accent">help</span> to see available commands.
          </span>
        </div>
      );
  }
};
