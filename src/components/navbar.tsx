import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Roasts</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="bg-black text-white grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2">
                  <Link 
                    to="/ResumeRoast" 
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">ResumeBurn</div>
                    <p className="text-sm leading-snug text-muted-foreground">Description for Roast 1</p>
                  </Link>
                  <Link 
                    to="/Roasts" 
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Roast 2</div>
                    <p className="text-sm leading-snug text-muted-foreground">Description for Roast 2</p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/About">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}