import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react"; // to check what is suspense
import { NavigationEvents } from "./(components)/navigation-events";
//import { MicProvider } from "./microphone";
import LoadingPage from "./(components)/loading-page";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return ( // hopefully the mic provider works
    <html lang="en">
      <body className={openSans.className}>
       
        {children}
        <Suspense fallback={<LoadingPage/>}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
