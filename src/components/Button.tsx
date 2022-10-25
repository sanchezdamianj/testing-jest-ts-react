import { Button as MUIButton } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

type Props = {
  isDirty: boolean;
  isValid: boolean;
  children?: string | any;
  type?: string ;
};

const Button = ({
  isDirty,
  isValid,
  children,
  type,
}: Props) => {
  return (
    <MUIButton
      type="submit"
      fullWidth
      variant="contained"
      disabled={!! (!isDirty || !isValid)}
    >
      {children}
    </MUIButton>
  );
}
export default Button;