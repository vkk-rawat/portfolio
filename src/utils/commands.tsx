import type { ReactNode, Dispatch, SetStateAction } from "react";
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
    name: "White Pad",
    desc: "Collaboarative real-time drawing app",
    link: "https://white-pad.vercel.app",
    github: "https://github.com/vkk-rawat/WhitePad",
  },
  {
    name: "Spaces",
    desc: "A minimalistic real-time chatting app",
    github: "https://github.com/vkk-rawat/Spaces",
  },
  {
    name: "Terminal Portfolio Website",
    desc: "My personal portfolio website in terminal style",
    github: "https://github.com/vkk-rawat/portfolio"
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

                    Contact: vickyrawat5998@gmail.com
                    GitHub: github.com/vkk-rawat`}
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
            I'm <Heading>Vivek Rawat</Heading>, 22. A passionate backend engineer.
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
              { label: "GitHub", url: "https://github.com/vkk-rawat", text: "vkk-rawat" },
              { label: "X", url: "https://x.com/its_vicky2603", text: "its_vicky2603" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/vivek-rawat-8ba714260/", text: "Vivek Rawat" },
              { label: "Email", url: "mailto:vickyrawat5998@gmail.com", text: "vickyrawat5998@gmail.com" },
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
            { title: "Languages", items: "TypeScript, JavaScript,Java" },
            { title: "Frameworks", items: "React/NextJS, Express" },
            { title: "Tools", items: "Git,Kafka,PostgreSQL, MongoDB,SQL" },
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
                </div>
              </div>
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
