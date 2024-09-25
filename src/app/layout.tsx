import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import Sidebar from "@/components/navigation/sidebar";
import ToasterProvider from "@/providers/toast-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nexa Dashboard",
  description: "E-Commerce Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <ToasterProvider/>
          <Navbar />
          <main className="flex">
            <section className="min-h-screen flex-none">
              <Sidebar />
            </section>
            <div className="flex-1 ">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
