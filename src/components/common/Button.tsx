import { FC } from "react";
import { ButtonProps } from "../../interfaces/buttonProps";

const Button: FC<ButtonProps> = (props) => {
  const { type, className, disabled, id, name, onClick, value } = props;

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
