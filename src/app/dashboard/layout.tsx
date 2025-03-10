import { AppSidebar } from "@/components/app-sidebar"
import { BreadCrumb } from "@/components/breadcrumb"
import Navbar from "@/components/navbar"
import { SidebarProvider} from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full p-4">
                <div>
                    <Navbar />
                </div>
                <BreadCrumb />
                    {children}
            </main>
        </SidebarProvider>
    )
}
