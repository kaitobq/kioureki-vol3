import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  display?: "flex" | "inline" | "hidden";
  items?: "center" | "end" | "start";
  margin?: string;
  disabled?: boolean;
};

const CustomButton = ({
  children,
  display,
  items,
  margin,
  ...props
}: Props) => {
  const getMarginClasses = (margin: string | undefined) => {
    if (!margin) return "";

    const margins = margin.split(" ");
    let marginClasses = "";
    switch (margins.length) {
      case 1:
        marginClasses = `m-${margins[0]}`;
        break;
      case 2:
        marginClasses = `my-${margins[0]} mx-${margins[1]}`;
        break;
      case 3:
        marginClasses = `mt-${margins[0]} mx-${margins[1]} mb-${margins[2]}`;
        break;
      case 4:
        marginClasses = `mt-${margins[0]} mr-${margins[1]} mb-${margins[2]} ml-${margins[3]}`;
        break;
      default:
        marginClasses = "";
    }
    console.log(`Generated margin classes: ${marginClasses}`);
    return marginClasses;
  };

  return (
    <button
      type="submit"
      className={`
      ${display ? display : ""}
      ${items ? "items-" + items : ""}
      ${getMarginClasses(margin)}
      bg-gray-500 focus:bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all transform hover:scale-105 focus:scale-105
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
