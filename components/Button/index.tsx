import { MouseEventHandler } from "react";

type Props = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: Props) {
  return <button onClick={onClick}>{text}</button>;
}

export default Button;
