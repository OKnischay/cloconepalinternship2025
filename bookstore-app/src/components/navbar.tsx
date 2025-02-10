import React from 'react'
import ThemeToggle from './toggle-theme'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='flex justify-between'>
            <SidebarTrigger/>
            <ThemeToggle/>
        </nav>
    </header>
  )
}

export default Navbar