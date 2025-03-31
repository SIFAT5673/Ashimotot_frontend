import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ClientProvider from "@/HOC/ClientProvider";

const font  = Roboto({
  weight:['100','300','400','500','700','900'],
  subsets:['latin'],
})

export const metadata: Metadata = {
  title: "ASHIMOTOTO",
  description: "A Social Media App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}>
          <ClientProvider>
            {children}
            <Toaster/>
          </ClientProvider>
      
        
      </body>
    </html>
  );
}
