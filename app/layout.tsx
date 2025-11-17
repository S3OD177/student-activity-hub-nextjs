import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeProvider as ColorThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["arabic", "latin"] })

export const metadata: Metadata = {
  title: "Student Activity Hub",
  description: "Manage and enroll in student activities",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${cairo.className}`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="student-hub-theme"
        >
          <ColorThemeProvider>
            <LanguageProvider>
              <Providers>
                {children}
                <Toaster />
              </Providers>
            </LanguageProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
