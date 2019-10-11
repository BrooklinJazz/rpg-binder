import combineClasses from "combine-classes";
import React from "react";

import style from "./Input.module.scss";

interface ITextProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput = (props: ITextProps) => (
  <input {...props} className={combineClasses(style.Text, props.className)} />
);

export default TextInput;
