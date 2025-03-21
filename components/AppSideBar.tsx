import { Banknote, BookKey, Home, LogOut, MessageCircleQuestion, Package, Tag, Ticket } from "lucide-react"

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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
    title: "Tags",
    url: "/tags",
    icon: Tag,
  },
  {
    title: "Atendimento/Helpdesk",
    url: "/atendimento-helpdesk",
    icon: MessageCircleQuestion,
  },
]


export function AppSidebar() {
  const router = useRouter()
  const [param, setParam] = useState<string | undefined>("")

  function handleLoggout() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")

    router.push("auth/login")
  }

  useEffect(() => {
    const href = window.location.href
    const param = href.split("/").pop()

    setParam(param)
  }, [])

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
                <SidebarMenuItem className={`${param == item.title.toLowerCase() && "border-r-4 border-black"}`} key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className="py-5 px-4" href={item.url}>
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
          <Button className="text-red-500" onClick={handleLoggout} variant={"ghost"}>
            <LogOut />
            Logout
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
