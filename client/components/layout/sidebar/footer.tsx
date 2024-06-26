"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import Avvvatars from "avvvatars-react";
import { useClerk } from "@clerk/nextjs";
import {
  LogOut,
  CircleUserRound,
  Settings,
  CircleHelp,
  CalendarCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarFooter() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user } = useUser();
  return (
    <div id="sidebar-footer" className="mt-auto">
      {isSignedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div
              id="user"
              className="flex items-center gap-2 rounded-md border border-zinc-900 bg-secondary-secondaryBG p-2"
            >
              <div id="user-avatar">
                <Avvvatars
                  value={
                    (user?.emailAddresses[0].emailAddress as string) ||
                    "lee@vercel.com"
                  }
                />
              </div>

              <div id="user-name">
                <p className="text-sm font-bold text-neutral-300">
                  {user?.username || "leerob"}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-zinc-900 bg-secondary-secondaryBG text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="border border-neutral-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-100">
                <CircleUserRound width={18} height={18} /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-100">
                <Settings width={18} height={18} /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-100">
                <CircleHelp width={18} height={18} /> Help
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-100">
                <CalendarCheck width={18} height={18} /> Book a call
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="border border-neutral-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center gap-1 text-neutral-300 focus:bg-primary-hover-primary focus:text-slate-100"
                onClick={() => signOut({ redirectUrl: "/sign-in" })}
              >
                <LogOut width={18} height={18} /> Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
