import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react"; // to check what is suspense
import { NavigationEvents } from "./(components)/navigation-events";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
