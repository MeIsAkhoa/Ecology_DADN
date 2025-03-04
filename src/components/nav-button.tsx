import { cva } from "class-variance-authority";

export const nav_Button = cva({
  varients: {
    varient: {
      chosen: "bg-blue-500 text-white flex items-center justify-center rounded-md px-4 py-2",
      unchosen: "bg-white text-black flex items-center justify-center",
    },

    size: {
      large: {},
      medium: {},
      small: {},
    },
  },
});
