import React from "react";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, children, ...rest } = props;
  return (
    <button className={"py-2 px-8 rounded mx-4 " + className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
