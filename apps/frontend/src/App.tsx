import { Outlet } from "react-router";
import { ModeToggle } from "./components/mode-toggler";
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900 dark:text-white">       
        <ModeToggle />
      </header>
      <main className="flex-1 px-6 py-8 dark:text-white">
        <Outlet />
      </main>
     
    </div>
  );
}

export default App;
