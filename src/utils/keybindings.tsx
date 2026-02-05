import { getOutput } from "./commands";
import type { ReactNode, KeyboardEvent, Dispatch, SetStateAction } from "react";

interface CommandItem {
  command: string;
  output: ReactNode;
}

const COMMANDS = [
  "about",
  "blogs",
  "cat",
  "clear",
  "date",
  "echo",
  "experience",
  "goals",
  "help",
  "history",
  "ls",
  "man",
  "neofetch",
  "projects",
  "pwd",
  "resume",
  "skills",
  "socials",
  "sudo rm -rf /*",
  "uptime",
  "whoami",
];

export const keybindings = (
  e: KeyboardEvent<HTMLInputElement>,
  setCommand: Dispatch<SetStateAction<CommandItem[]>>,
  setHistoryIndex: Dispatch<SetStateAction<number>>,
  setCurrentCommand: Dispatch<SetStateAction<string>>,
  currentCommand: string,
  commands: CommandItem[],
  historyIndex: number
): void => {
  // Ctrl+L - Clear terminal
  if (e.ctrlKey && e.key.toLowerCase() === "l") {
    e.preventDefault();
    setCommand([]);
    setCurrentCommand("");
    setHistoryIndex(0);
    return;
  }

  // Ctrl+C - Cancel current input
  if (e.ctrlKey && e.key.toLowerCase() === "c") {
    e.preventDefault();
    if (currentCommand.length > 0) {
      setCommand((prev) => [
        ...prev,
        { command: currentCommand + "^C", output: "" },
      ]);
    }
    setCurrentCommand("");
    setHistoryIndex(0);
    return;
  }

  // Ctrl+U - Clear current line
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
    setCurrentCommand("");
    return;
  }

  // Enter - Execute command
  if (e.key === "Enter") {
    e.preventDefault();
    const trimmed = currentCommand.trim();
    if (trimmed) {
      setCommand((prev) => [
        ...prev,
        { command: trimmed, output: getOutput(trimmed, setCommand) },
      ]);
    } else {
      setCommand((prev) => [...prev, { command: "", output: "" }]);
    }
    setCurrentCommand("");
    setHistoryIndex(0);
    return;
  }

  // ArrowUp - Previous command
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (commands.length > 0) {
      const newIndex = Math.min(historyIndex + 1, commands.length);
      setHistoryIndex(newIndex);
      const cmd = commands[commands.length - newIndex];
      if (cmd) setCurrentCommand(cmd.command);
    }
    return;
  }

  // ArrowDown - Next command
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      if (newIndex === 0) {
        setCurrentCommand("");
      } else {
        const cmd = commands[commands.length - newIndex];
        if (cmd) setCurrentCommand(cmd.command);
      }
    }
    return;
  }

  // Tab - Autocomplete
  if (e.key === "Tab") {
    e.preventDefault();
    const input = currentCommand.toLowerCase().trim();
    if (!input) return;

    const matches = COMMANDS.filter((cmd) => cmd.startsWith(input));
    if (matches.length === 1) {
      setCurrentCommand(matches[0]);
    } else if (matches.length > 1) {
      // Find common prefix
      let common = matches[0];
      for (const match of matches) {
        while (!match.startsWith(common)) {
          common = common.slice(0, -1);
        }
      }
      if (common.length > input.length) {
        setCurrentCommand(common);
      }
    }
    return;
  }
};
