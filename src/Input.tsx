import React, { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => {
    return (
        <input
            className='rounded-md w-full h-10 shadow-sm border p-2 focus:border-blue-500 hover:border-blue-500 hover:opacity-90 active:opacity-75'
            {...props}
        />
    );
};

export default Input;
