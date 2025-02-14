"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import SVGIcon from "../SVGIcon"

type Props = {
    className?: string
}

const Navbar = ({ className }: Props) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-black/70" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Using a fixed small padding so the navbar remains compact */}
                <div className="flex items-center justify-between transition-all duration-300 py-2">
                    <div className="flex-shrink-0">
                        {/* The logo is scaled larger (h-16) even though the navbar is small */}
                        <SVGIcon
                            iconName="techtrixLogo"
                            className="transition-all duration-300 h-16 w-auto"
                            width={scrolled ? 150 : 250}
                            height={scrolled ? 150 : 250}
                        />
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/events">Events</NavLink>
                        <NavLink href="/team">Team</NavLink>
                        <NavLink href="/login">Login</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}

type NavLinkProps = {
    href: string
    children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
    return (
        <Link
            href={href}
            className="relative overflow-hidden min-w-[150px] px-10 py-3 rounded-full bg-black text-white text-base font-semibold border-2 border-gray-600 hover:bg-gray-900 transition-colors duration-300 text-center"
        >
            <span className="relative z-10">{children}</span>
            <span className="absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 animate-glitter"></span>
        </Link>
    )
}

export default Navbar
