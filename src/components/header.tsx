const Header = () => {
  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <header className="px-4 pt-4 pb-2 select-none">
      <div className="text-terminal-muted text-sm mb-4">
        Last login: {currentDate} on ttys000
      </div>

      <pre className="text-terminal-link font-bold text-xs sm:text-sm leading-tight mb-4 overflow-x-auto">
        {`
██╗   ██╗██╗██╗   ██╗███████╗██╗  ██╗
██║   ██║██║██║   ██║██╔════╝██║ ██╔╝
██║   ██║██║██║   ██║█████╗  █████╔╝ 
╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══╝  ██╔═██╗ 
 ╚████╔╝ ██║ ╚████╔╝ ███████╗██║  ██╗
  ╚═══╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
        `.trim()}
      </pre>

      <div className="text-terminal-text space-y-1 text-sm">
        <p>Welcome to my interactive terminal portfolio.</p>
        <p>
          Type <span className="text-terminal-accent font-semibold">help</span>{" "}
          to see available commands.
        </p>
        <p className="text-terminal-muted">
          <span className="text-terminal-accent">↑↓</span> history &nbsp;
          <span className="text-terminal-accent">Tab</span> autocomplete &nbsp;
          <span className="text-terminal-accent">Ctrl+L</span> clear &nbsp;
          <span className="text-terminal-accent">Ctrl+C</span> cancel
        </p>
      </div>
    </header>
  );
};

export default Header;
