import React, { FC } from "react";

interface CellProps {
    cell: string;
}

const Cell: FC<CellProps> = ({ cell }) => {
    const dynamicStyles = ["bg-red-600", "bg-green-600"];
    return (
        <div
            className={`w-7 sm:w-10 md:w-15 h-7 sm:h-10 md:h-15   border ${
                dynamicStyles[cell as "0" | "1"]
            }`}></div>
    );
};

export default Cell;
