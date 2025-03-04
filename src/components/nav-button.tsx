import { cva, type VariantProps } from "class-variance-authority";

export const nav_Button = cva(
  "flex items-center rounded-md px-4 py-2 transition duration-300 gap-2",
  {
    variants: {
      variant: {
        chosen: "bg-blue-500 text-white",
        unchosen: "bg-white text-black hover:bg-gray-200",
      },
      size: {
        large: "text-lg py-3 px-6",
        medium: "text-base py-2 px-4",
        small: "text-sm py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "unchosen",
      size: "medium",
    },
  }
);

// ✅ Định nghĩa type cho variants để tránh lỗi TypeScript
export type NavButtonProps = VariantProps<typeof nav_Button>;
