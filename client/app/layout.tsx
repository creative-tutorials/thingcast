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
  openGraph: {
    url: "https://thingcast.vercel.app",
    title: "Dashboard | thingcast",
    description: "Event management dashboard for thingcast",
    siteName: "thingcast",
    images: [
      {
        url: "https://res.cloudinary.com/derbreilm/image/upload/v1718886395/openg-graph_img_thingcast_zmjn4h.png",
        alt: "Dashboard | thingcast",
      },
    ],
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
        signIn: {
          variables: {
            // colorPrimary: "red",
            colorBackground: "#09090b",
          },
        },
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
