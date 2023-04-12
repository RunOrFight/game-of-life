import React, { FC } from "react";
import uuid from "react-uuid";
import Cell from "./Cell";

interface RowProps {
    row: string;
}

const Row: FC<RowProps> = ({ row }) => {
    return (
        <div className='flex'>
            {row.split("").map((cell) => (
                <Cell
                    key={uuid()}
                    cell={cell}
                />
            ))}
        </div>
    );
};

export default Row;
