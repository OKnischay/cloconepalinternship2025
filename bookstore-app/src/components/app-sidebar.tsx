import { DashboardItems } from "./common/DashboardList";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logout from "./logout";


const handleLogout = () => {
  localStorage.removeItem("access_token");
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-2xl font-bold p-6 border-b border-slate-700">
            BookStore
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {DashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 p-4 hover:bg-slate-200/50 transition-colors duration-200 rounded-lg"
                    >
                      <item.icon className="w-5 h-5 " />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="m-2 border-t border-slate-700">
        <Logout/>
      </div>
    </Sidebar>
  );
}