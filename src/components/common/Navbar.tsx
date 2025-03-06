'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SVGIcon from '../SVGIcon';
import clsx from 'clsx';
import { login } from '@/utils/functions/login';
import { useUser } from '@/lib/stores';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { supabase } from '@/utils/functions/supabase-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { verifyCommunityReferralCode } from '@/lib/actions';
import { getRoles, updateReferralCode } from '@/utils/functions';

type Props = {
  className?: string;
};

export const SignInButton = () => {
  const { userData, userLoading, clearUserData } = useUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const readUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user.user_metadata?.avatar_url) {
        setProfileImage(data.session.user.user_metadata.avatar_url);
      }
    };
    readUserSession();
  }, []);

  if (userLoading) {
    return <Skeleton className="w-10 h-10 rounded-full bg-gray-600" />;
  }

  if (userData && profileImage) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="relative">
            {!imageLoaded && (
              <Skeleton className="w-10 h-10 rounded-full absolute inset-0" />
            )}
            <AvatarImage
              src={profileImage}
              alt="Profile"
              onLoad={() => setImageLoaded(true)}
              className={imageLoaded ? 'block' : 'hidden'}
            />
            <AvatarFallback>
              {!userLoading && userData?.name ? userData.name.charAt(0) : ''}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => {
              router.push('/profile');
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={async () => {
              await supabase.auth.signOut();
              localStorage.removeItem('sb-session'); // Adjust based on storage mechanism
              clearUserData();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button
      className="group relative scale-100 overflow-hidden rounded-lg py-2 transition-transform hover:scale-105 active:scale-95"
      onClick={async () => {
        const ref =
          typeof window !== 'undefined' && localStorage.getItem('ref');
        await login();
        if (userData) {
          const { data } = await supabase.auth.getSession();
          const createdAt = Math.floor(new Date(userData.created_at).getTime());
          const now = new Date().getTime();
          if (now - createdAt < 60 * 1000) {
            if (ref) {
              const code = await verifyCommunityReferralCode(ref);
              if (code) {
                if (!data) {
                  typeof window !== 'undefined' &&
                    localStorage.setItem('ref', ref);
                } else {
                  await updateReferralCode(ref, userData.id);
                }
              }
            }
          }
        }
      }}
    >
      <span className="relative z-10 text-white/90 transition-colors group-hover:text-white bg-blue-500 font-bold rounded-full px-4 py-2">
        Login
      </span>
      <span className="absolute inset-0 z-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
};

const Navbar = ({ className }: Props) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const verifyRoles = async () => {
      const rolesData = await getRoles();
      const roles = rolesData?.map((role) => role.role);
      rolesData!.length > 0 && roles?.includes('super_admin') && setIsAdmin(true);
    };
    verifyRoles();
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const router = useRouter();
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/70' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between transition-all duration-300">
          <div className="flex-shrink-0" onClick={() => router.push('/')}>
            <Image
              src={'https://i.postimg.cc/vZjbz2zk/Techtrix-Logo.png'}
              alt="Techtrix Logo"
              width={isMobile ? 100 : scrolled ? 100 : 160}
              height={isMobile ? 100 : scrolled ? 100 : 160}
            />
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/team/tech">Team</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            {isAdmin && <NavLink href="/admin/manage-events">Admin</NavLink>}
            <NavLink href="/contacts">Contact Us</NavLink>
            <div className="ml-10">
              <SignInButton />
            </div>
          </div>
          {/* Hamburger for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  // Close icon
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu - absolutely positioned so it doesn't push content */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-black/90 p-4 rounded-b-lg overflow-hidden transform transition-all duration-300 origin-top ${
            mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}
        >
          <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </MobileNavLink>
          <MobileNavLink
            href="/team/tech"
            onClick={() => setMobileMenuOpen(false)}
          >
            Team
          </MobileNavLink>
          <MobileNavLink
            href="/gallery"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </MobileNavLink>
          {isAdmin && (
            <MobileNavLink
              href="/admin/manage-events"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </MobileNavLink>
          )}
          <MobileNavLink
            href="/contacts"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </MobileNavLink>
          <div className="ml-4 mt-2">
            <SignInButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  asButton?: boolean;
  onClick?: () => void;
}
const NavLink = ({
  href,
  children,
  asButton = false,
  onClick,
}: NavLinkProps) => {
  const commonClasses =
    'relative overflow-hidden  px-10 py-2 rounded-full bg-black text-white text-base font-semibold border-2 border-gray-600 hover:bg-gray-900 transition-colors duration-300 text-center';

  const shimmerEffect = (
    <span className="absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 animate-glitter"></span>
  );

  if (asButton) {
    return (
      <button className={clsx(commonClasses)} onClick={onClick}>
        <span className="relative z-10">{children}</span>
        {shimmerEffect}
      </button>
    );
  }

  return (
    <Link href={href!} className={clsx(commonClasses)}>
      <span className="relative z-10">{children}</span>
      {shimmerEffect}
    </Link>
  );
};

type MobileNavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
};

const MobileNavLink = ({ href, children, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-white text-lg font-semibold hover:bg-gray-800 transition-colors"
    >
      {children}
    </Link>
  );
};

export default Navbar;
