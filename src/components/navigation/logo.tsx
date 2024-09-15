'use client'

import Image from "next/image"
import Link from "next/link"
import { useMenuStore } from "@/store/toggle-menu-store"
import { motion, AnimatePresence } from "framer-motion"

const Logo = () => {
    const {isOpen} = useMenuStore()
  return (
   <Link href={"/"} className="flex items-center gap-2">
    <Image
    src={"logo-icon.svg"}
    height={30}
    width={30}
    alt="logo"
    />
    <AnimatePresence initial={false}>
        {
            isOpen && (
                <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{width: 0, opacity: 0}}
                transition={{ duration: 0.3 }}
                className="text-l font-semibold max-md:hidden whitespace-nowrap">
                    Nexa Dashborad
                </motion.div>
            )
        }
    </AnimatePresence>
   </Link>
  )
}

export default Logo
