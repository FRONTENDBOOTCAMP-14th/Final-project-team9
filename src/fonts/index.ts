import localFont from "next/font/local";

// --------------------------------------------------------------------------
// Local Fonts

// 여기어때 잘난체

export const jalnan = localFont({
  src: "/Jalnan2TTF.ttf",
  weight: "700",
  display: "swap",
  style: "normal",
});

// Min Sans

export const minSans = localFont({
  variable: "--min-sans",
  src: [
    {
      path: "/MinSansVF.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

// --------------------------------------------------------------------------
// Fonts Module

const fonts = {
  jalnan,
  minSans,
};

export default fonts;
