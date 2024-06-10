import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { env } from "@/env";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { TanStackClient } from "./tanstack-client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | thingcast",
  description: "Event management dashboard for thingcast",
  icons: {
    icon: "/thingcast.png",
    shortcut: "/thingcast.png",
    apple: "/thingcast.png",
  },
};

const clerkPublicKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={clerkPublicKey}
      appearance={{
        baseTheme: dark,
      }}
    >
      <TanStackClient>
        <html lang="en">
          <body className={inter.className}>
            <main>{children}</main>
            <Toaster richColors />
          </body>
        </html>
      </TanStackClient>
    </ClerkProvider>
  );
}
