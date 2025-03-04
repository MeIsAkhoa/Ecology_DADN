import { cva } from "class-variance-authority";

export const Chart = cva({
    variants: {
        theme: {
          temp: "bg-blue-200 text-black rounded-md px-4 py-2 border border-black flex items-center justify-center",
          light: "bg-yellow-200 text-black rounded-md px-4 py-2 border border-black flex items-center justify-center",
          humid: "bg-brown-200 text-black rounded-md px-4 py-2 border border-black flex items-center justify-center",
        },

      },
      defaultVariants: {
        theme: "light",
      },
});