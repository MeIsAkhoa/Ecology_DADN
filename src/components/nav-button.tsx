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

// ✅ Định nghĩa type props
export type NavButtonProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

// ✅ Component cho button "chosen"
export const NavButtonChosen = ({ to, icon, label }: NavButtonProps) => (
  <a href={to} className={nav_Button({ variant: "chosen" })}>
    {icon}
    <span className="hidden lg:inline">{label}</span>
  </a>
);

// ✅ Component cho button "unchosen"
export const NavButtonUnchosen = ({ to, icon, label }: NavButtonProps) => (
  <a href={to} className={nav_Button({ variant: "unchosen" })}>
    {icon}
    <span className="hidden lg:inline">{label}</span>
  </a>
);
