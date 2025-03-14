'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { LogOut } from 'lucide-react'

const Logout = () => {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    router.push('/')
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleLogout}>
          <LogOut/>
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>

  )
}

export default Logout