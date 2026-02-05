import Header from "./header";
import Command from "./command-area";

const Terminal = () => {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono flex flex-col">
      <Header />
      <Command />
    </div>
  );
};

export default Terminal;
