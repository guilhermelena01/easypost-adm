import { Archive, Banknote, BookKey, Calendar, Home, Inbox, LogOut, MessageCircleQuestion, Package, Search, Settings, SidebarClose, Ticket } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "./ui/button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Financeiro",
    url: "/financeiro",
    icon: Banknote,
  },
  {
    title: "Produtos",
    url: "/produtos",
    icon: Package,
  },
  {
    title: "Cupons",
    url: "/cupons",
    icon: Ticket,
  },
  {
    title: "Atendimento helpdesk",
    url: "/atendimento-helpdesk",
    icon: MessageCircleQuestion,
  },
  {
    title: "Política e privacidade",
    url: "/cupons",
    icon: BookKey,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="p-4">
          <Image alt="logo easypost" src={"https://res.cloudinary.com/dbyqw2jjq/image/upload/v1740231181/admin_2_rzjb7i.png"} width={160} height={80} />
        </SidebarHeader>
        <SidebarGroup className="h-dvh">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="w-full flex items-start">
          <Button variant={"ghost"}>
            <LogOut />
            Loggout
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
