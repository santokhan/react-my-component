import { twMerge } from "tailwind-merge";

// eslint-disable-next-line react/prop-types
const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className={twMerge(
        "max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
