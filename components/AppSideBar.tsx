import { Archive, Banknote, BookKey, Calendar, Home, Inbox, MessageCircleQuestion, Package, Search, Settings, Ticket } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

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
    title: "Serviços",
    url: "/servicos",
    icon: Archive,
  },
  {
    title: "Cupons",
    url: "/cupons",
    icon: Ticket,
  },
  {
    title: "Atendimento helpdesk",
    url: "/cupons",
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
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
      </SidebarContent>
    </Sidebar>
  )
}
