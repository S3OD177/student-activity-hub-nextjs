"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Calendar, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { ThemeSelector } from "@/components/theme-selector"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { useLanguage } from "@/contexts/language-context"

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={session ? (session.user.role === "admin" ? "/admin" : "/dashboard") : "/"} className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Activity Hub
              </span>
            </div>
          </Link>
        
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {session ? (
              <>
                {session.user.role === "admin" ? (
                  <>
                    <Link href="/calendar"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.calendar')}</Button></Link>
                    <Link href="/admin/analytics"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.analytics')}</Button></Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.dashboard')}</Button></Link>
                    <Link href="/activities"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.activities')}</Button></Link>
                    <Link href="/clubs"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.clubs')}</Button></Link>
                    <Link href="/calendar"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.calendar')}</Button></Link>
                    <Link href="/portfolio"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.portfolio')}</Button></Link>
                    <Link href="/certificates"><Button variant="ghost" size="sm" className="text-sm font-medium">{t('nav.certificates')}</Button></Link>
                  </>
                )}
              </>
            ) : null}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            
            {session ? (
              <>
                <div className="hidden sm:block">
                  <NotificationDropdown />
                </div>
                
                <div className="hidden lg:flex items-center gap-3 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                    {session.user.role === "admin" && (
                      <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Admin</span>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })} title="Logout">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline-flex">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {session && mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <nav className="flex flex-col gap-2">
              {session.user.role === "admin" ? (
                <>
                  <Link href="/calendar" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.calendar')}</Button></Link>
                  <Link href="/admin/analytics" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.analytics')}</Button></Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.dashboard')}</Button></Link>
                  <Link href="/activities" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.activities')}</Button></Link>
                  <Link href="/clubs" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.clubs')}</Button></Link>
                  <Link href="/calendar" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.calendar')}</Button></Link>
                  <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.portfolio')}</Button></Link>
                  <Link href="/certificates" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.certificates')}</Button></Link>
                  <Link href="/activity" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.activities')}</Button></Link>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">{t('nav.profile')}</Button></Link>
                </>
              )}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
                <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
