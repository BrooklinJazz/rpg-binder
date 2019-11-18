import combineClasses from "combine-classes";
import React, { ReactNode } from "react";

import { Spinner } from "../Loading";
import { DangerSnackbar } from "../Snackbar";

interface IFormProps extends React.HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error?: string;
}

const Form = ({
  children,
  onSubmit,
  isLoading,
  error,
  ...props
}: IFormProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const displaySnackbar = Boolean(submitted) && Boolean(error);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(false);
    setSubmitted(true);
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <>
      <form
        {...props}
        onSubmit={handleSubmit}
        className={combineClasses(props.className)}
      >
        {children}
        {isLoading && <Spinner />}
      </form>
      <DangerSnackbar
        close={() => setSubmitted(false)}
        isOpen={displaySnackbar}
        message={error}
      />
    </>
  );
};

export default Form;
