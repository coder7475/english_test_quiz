
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "../mode-toggler";
import { TestTube2 } from "lucide-react";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  return (
    <header className="border-b bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-9 md:hidden rounded-full border border-muted-foreground/20 shadow-sm hover:bg-muted transition"
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40 p-2 md:hidden rounded-lg shadow-lg bg-white dark:bg-card">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="block w-full px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-muted hover:text-primary transition">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="/" className="text-xl font-bold text-primary hover:text-primary/90 transition-colors tracking-tight">
              {/* <Logo /> */}
             <TestTube2 className="w-12" />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm px-4 py-2 rounded-md border border-muted-foreground/20 shadow-sm hover:bg-muted transition"
            >
              Logout
            </Button>
          ) : (
            <Button
              asChild
              className="text-sm px-4 py-2 rounded-md border border-primary/60 shadow-sm bg-primary text-white hover:bg-primary/90 transition"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}