import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "basic" | "long";
}

const Button: FC<ButtonProps> = ({ children, variant = "basic", ...props }) => {
    const stlyes = {
        basic: "w-20",
        long: "w-28"
    };
    return (
        <button
            className={`${stlyes[variant]} h-10 rounded-md font-medium text-white bg-blue-500 shadow-sm hover:opacity-90 active:opacity-75 disabled:bg-gray-500 disabled:hover:opacity-100`}
            {...props}>
            {children}
        </button>
    );
};

export default Button;
