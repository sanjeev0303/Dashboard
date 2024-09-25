'use client'

import React, { useState } from 'react'
import { useMenuStore } from '@/store/toggle-menu-store'
import { motion } from 'framer-motion'
import LogOutButton from '../authentication/logout-button'
import MenuLinks from './menu-links'
import useRouteCheck from '@/hooks/useRouteCheck'
import { useEffect } from 'react'

type Props = {}

const Sidebar = (props: Props) => {
    const { isOpen } = useMenuStore()
    const [loading, setIsLoading] = useState(true)
    const loginRoute = useRouteCheck(["login"]);
    const registerRoute = useRouteCheck(["register"])
    const onbordingRoute = useRouteCheck(["onbording"])

    useEffect(() => {
        if (!loginRoute && !registerRoute && !onbordingRoute) {
            setIsLoading(false)
        }
    }, [loginRoute, registerRoute, onbordingRoute])

  if(loading || loginRoute || registerRoute || onbordingRoute) {
    return null;
  }

  return (
    <motion.div
    initial={{width: isOpen ? 80 : 250}}
    animate={{width: isOpen ? 80 : 250}}
    transition={{ duration: 0.3, ease : "easeInOut"}}
    className={`sticky top-0 z-10 h-screen flex flex-col items-center overflow-hidden border-r py-3 max-md:max-w-[80px] md:max-w-[250px] lg:max-w-[350px] ${ isOpen ? "max-md:hidden gap-10" : "block gap-10" }`}
 >
    <h2 className={`text-sm max-md:hidden font-semibold ${ isOpen && "hidden" }`}>
    Main Menu
    </h2>
    <MenuLinks isOpen={isOpen} />
    <LogOutButton />
   </motion.div>
  )
}

export default Sidebar
