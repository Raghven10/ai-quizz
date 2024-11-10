"use client";

import React, { useState } from 'react'
import { Nav } from './ui/nav'
import { AlertCircle, Archive, ArrowBigRight, BadgeInfo, BarChart, BarChart3, BookPlus, BookUser, Calendar, ChevronRight, ChevronRightCircle, Computer, File, Info, MessagesSquare, Monitor, PcCase, School, Settings, ShoppingCart, TestTubes, User, Users2 } from 'lucide-react'
import { Button } from './ui/button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="relative min-w-[80px] max-h-screen border-r px-3 pb-10">
      <div className='absolute right-[-20px] top-7'>
        <Button 
        variant={"secondary"}
        className='rounded-full p-2'
        onClick={toggleSidebar}>
        <ChevronRight /> 
        </Button>
      </div>
    
      <Nav
      isCollapsed={isCollapsed}
      links={[
        {
          title: "Dashboard",
          icon: Monitor,
          variant: "ghost",
          href: "/dashboard"
        },
        {
          title: "Users",
          icon: Users2,
          variant: "ghost",
          href: "/users"
        },
        {
          title: "Exam",
          // label: "quizz",
          icon: TestTubes,
          variant: "ghost",
          href: "/quizz"
        },
        {
          title: "Question Bank",
          icon: School,
          variant: "ghost",
          href: "/question-bank"
        },
        {
          title: "Resources",
          icon: File,
          variant: "ghost",
          href: "/resources"
        },
        {
          title: "Schedules",
          icon: Calendar,
          variant: "ghost",
          href: "/attendence"
        },
        {
          title: "Notifications",
          icon: BadgeInfo,
          variant: "ghost",
          href: "/notifications"
        },
        {
          title: "Settings",
          icon: Settings,
          variant: "ghost",
          href: "/settings"
        },
        
        {
          title: "About",
          icon: Info,
          variant: "ghost",
          href: "/about"
        },

      ]}
      />
  </div>
  )
}

export default Sidebar