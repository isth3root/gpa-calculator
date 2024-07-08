import { MouseEvent } from "react";

export type ButtonProps = {
    value?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    id?: string;
    className: string;
    disabled: boolean;
    name?: string;
    type?: "button" | "reset" | "submit";
}