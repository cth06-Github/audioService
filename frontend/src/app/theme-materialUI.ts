import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobileTablet: true; // adds the `mobile` breakpoint
    bigTablet: true;
    computerSmall: true;
    computerMid: true;
    computerBig: true;
    biggerScreen: true;
    monitor: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      mobileTablet: 0,
      bigTablet: 800,
      computerSmall: 936,
      computerMid: 1080,
      computerBig: 1200,
      biggerScreen: 1400,
      monitor: 1536, // 1536 and above
    },
  },
});
// Note: the namings of breakpoints are arbitary for some.
// reference: https://mui.com/material-ui/customization/breakpoints/
