import { FC } from "react";
import { InputProps } from "../../interfaces/inputProp";

const Input: FC<InputProps> = (props) => {
  const {
    type,
    value,
    onChange,
    placeholder = "",
    name,
    id,
    className,
    required = false,
    title,
  } = props;

  const commonProps = {
    type,
    value,
    onChange,
    placeholder,
    name,
    id,
    className,
    required,
    title,
  };

  if (type === "number" || type === "range") {
    const { min, max, step } = props;
    return <input {...commonProps} min={min} max={max} step={step} />;
  }

  if (type === "text") {
    const { maxLength, minLength, pattern } = props;
    return (
      <input
        {...commonProps}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
      />
    );
  }

  if (type === "email" || type === "password") {
    const { maxLength, minLength, pattern } = props;
    return (
      <input
        {...commonProps}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
      />
    );
  }

  return <input {...commonProps} />;
};

export default Input;

