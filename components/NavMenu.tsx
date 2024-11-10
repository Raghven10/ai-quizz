import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChartBig, CreditCard, LogOut, Mail, MessageCircle, Settings, User, Users } from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
function SignOut() {
  return (
      <form action={async ()=> {
          'use server';
          await signOut();
      }}>
          <Button type="submit" variant={"ghost"}>Sign Out</Button>
      </form>
  )
}

export function NavMenu() {
    
  return (
   
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href = "/dashboard" className="flex flex-row">
            <BarChartBig className="mr-2 h-4 w-4"/>
            <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <User className="mr-2 h-4 w-4"/>
          <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4"/>
          <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4"/>
          <span>Settings</span>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4"/>
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem><Mail className="mr-2 h-4 w-4"/><span>Email</span></DropdownMenuItem>
                <DropdownMenuItem><MessageCircle className="mr-2 h-4 w-4"/><span>Message</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><span>More...</span></DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4"/>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
   
  )
}
