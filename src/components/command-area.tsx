import { useState, useRef, useEffect, type ReactNode, type KeyboardEvent } from "react";
import { keybindings } from "../utils/keybindings";

interface CommandItem {
  command: string;
  output: ReactNode;
}

const Prompt = () => (
  <span className="flex-shrink-0 select-none">
    <span className="text-terminal-prompt font-bold">vivek</span>
    <span className="text-terminal-muted">@</span>
    <span className="text-terminal-prompt font-bold">rawat</span>
    <span className="text-terminal-muted">:</span>
    <span className="text-terminal-link font-bold">~</span>
    <span className="text-terminal-muted">$ </span>
  </span>
);

const Command = () => {
  const [commands, setCommands] = useState<CommandItem[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [historyIndex, setHistoryIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener("keydown", focusInput);
    return () => window.removeEventListener("keydown", focusInput);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commands]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    keybindings(
      e,
      setCommands,
      setHistoryIndex,
      setCurrentCommand,
      currentCommand,
      commands,
      historyIndex
    );
  };

  return (
    <main
      className="flex-1 px-4 pb-4 cursor-text overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl">
        {commands.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-start gap-0 flex-wrap">
              <Prompt />
              <span className="text-terminal-text break-all">{item.command}</span>
            </div>
            <div className="mt-1 text-terminal-text whitespace-pre-wrap">
              {item.output}
            </div>
          </div>
        ))}

        <div className="flex items-center">
          <Prompt />
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-terminal-text caret-transparent"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
            <span
              className="terminal-cursor absolute top-0 pointer-events-none"
              style={{ left: `${currentCommand.length}ch` }}
            />
          </div>
        </div>

        <div ref={bottomRef} />
      </div>
    </main>
  );
};

export default Command;
