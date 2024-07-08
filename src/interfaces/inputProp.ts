import { ChangeEvent } from "react";

export type InputProps = {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  className: string;
  required?: boolean;
  title?: string;
} & (
  | {
      type: "number" | "range";
      min: number;
      max: number;
      step?: number;
    }
  | {
      type: "text";
      maxLength: number;
      minLength?: number;
      pattern?: string;
    }
  | {
      type: "email" | "password";
      maxLength?: number;
      minLength?: number;
      pattern: string;
    }
);
