'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
//   import {
//     SidebarTrigger,
//   } from "@/components/ui/sidebar"
  
  
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { usePathname } from "next/navigation"
import { Fragment } from "react";

  export function BreadCrumb() {
    const paths = usePathname();
    const pathname = paths.split('/').filter(path => path)
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          {/* <SidebarTrigger className="-ml-1" /> */}
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/"></BreadcrumbLink>
                </BreadcrumbItem>
                {pathname.length > 0 && <BreadcrumbSeparator/>}
                {pathname.map((link,index)=>{
                  const href = `/${pathname.slice(0, index + 1 ).join('/')}`
                  const linkname = link[0].toUpperCase() + link.slice(1,link.length)
                  const lastpath = pathname.length === index + 1 
                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem>
                       {!lastpath ? 
                       <BreadcrumbLink asChild>
                        <Link href={href}>{linkname}</Link>
                       </BreadcrumbLink>:
                       <BreadcrumbPage>{linkname}</BreadcrumbPage>}
                      </BreadcrumbItem>
                      {pathname.length !== index + 1 && <BreadcrumbSeparator/>}
                    </Fragment>
                  )
                })}
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>
    )
  }