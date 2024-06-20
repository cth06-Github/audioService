import { Open_Sans } from "next/font/google";
import "./globals.css";
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from '../theme';

const openSans = Open_Sans({ subsets: ["latin"] });

/*
export const metadata = {
  title: "Transcription Service",
  description: "HTX",
};*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
          {children}
      </body>
    </html>
  );
}

/*
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
*/