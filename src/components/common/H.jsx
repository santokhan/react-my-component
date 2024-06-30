import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
const H = ({ variant, children, className = "" }) => {
  let titleClasses = "";

  switch (variant) {
    case "h1":
      titleClasses += " text-3xl sm:text-4xl font-bold";
      return <h1 className={twMerge(titleClasses, className)}>{children}</h1>;
    case "h2":
      titleClasses += " text-2xl sm:text-3xl font-semibold";
      return <h2 className={twMerge(titleClasses, className)}>{children}</h2>;
    case "h3":
      titleClasses += " text-xl sm:text-2xl font-semibold";
      return <h3 className={twMerge(titleClasses, className)}>{children}</h3>;
    case "h4":
      titleClasses += " text-lg sm:text-xl font-semibold";
      return <h4 className={twMerge(titleClasses, className)}>{children}</h4>;
    case "h5":
      titleClasses += " text-base sm:text-lg font-semibold";
      return <h5 className={twMerge(titleClasses, className)}>{children}</h5>;
    case "h6":
      titleClasses += " text-sm sm:text-base font-semibold";
      return <h6 className={twMerge(titleClasses, className)}>{children}</h6>;
    default:
      titleClasses += " text-xl font-bold"; // Default variant
      return <h5 className={twMerge(titleClasses, className)}>{children}</h5>;
  }
};

export default H;
