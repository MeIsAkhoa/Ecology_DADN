import { cva } from "class-variance-authority";

export const container = cva({
  varients: {
    varient: {
      large_container: "flex flex-col items-center justify-center bg-green-200 rounded-md px-4 py-2",
      content_container: "bg-white flex flex-col items-center justify-center rounded-md px-4 py-2",
      
    },

    size: {
      large: {},
      medium: {},
      small: {},
    },
  },
});
