import { Bell, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
        <div className="flex items-center gap-2 mr-4 hidden md:flex">
          <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">NS</span>
          </div>
          <span className="font-bold tracking-tight">NewsSaar AI</span>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none max-w-sm">
            <Input
              type="search"
              placeholder="Search workspaces..."
              className="h-9 md:w-[300px] lg:w-[400px]"
            />
          </div>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border">
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
