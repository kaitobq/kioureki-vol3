import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  display?: "flex" | "inline" | "hidden";
  items?: "center" | "end" | "start";
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  disabled?: boolean;
};

const CustomButton = ({
  children,
  display,
  items,
  mt,
  mb,
  ml,
  mr,
  ...props
}: Props) => {
  return (
    <button
      type="submit"
      className={`
      ${display ? display : ""}
      ${items ? "items-" + items : ""}
      ${mt ? "mt-" + mt : ""}
    bg-gray-500 focus:bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105 focus:scale-105`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
