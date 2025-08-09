
import { Button } from "@/components/ui/button";

const Home = () => {
    // Using a query hook automatically fetches data and returns query values
  
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <h1 className="text-3xl font-bold mb-2">Welcome to the Home Page</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">This is your starting point. Explore the app!</p>            
            <Button
                className="px-6 py-2 text-lg"
                onClick={() => {
                    window.location.href = "/about";
                }}
            >
                About Me Page
            </Button>
          
        </div>
    );
};

export default Home;