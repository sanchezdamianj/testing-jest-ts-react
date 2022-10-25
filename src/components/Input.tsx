import React from "react";
import { TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";


const formValidation = (errors: any, errorKey:any) =>{
  return errors[errorKey] ? <Typography color="red">{errors[errorKey].message}</Typography> : '';
}
const Input = ({
  name= '',
  label = "",
  type = '',
  disabled = false,
}) => {
  const { register, errors } = useFormContext();

  return (
    <div>
      <TextField
        required
        disabled={disabled}
        type={type}
        error={errors && !!errors[name]}
        id={name}
        label={label}
        variant='outlined'
        {...register(name)}
        fullWidth
      />
      {errors && formValidation(errors, name)}
    </div>
  );
};

export default Input;
 