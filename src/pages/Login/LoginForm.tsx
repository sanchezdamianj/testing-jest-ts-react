import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { FormProvider, useForm, UseFormRegister } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import DisplayFormValues from "./components/DisplayFormValues";
import { LoginFormSchema } from "./schemas/login-form-schema";
import { callEndpoint } from "./services/call-enpoint";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });

  const userNameWatch = watch("username");
  const passwordWatch = watch("password");

  const onSubmit = async (data:any) => {
    const result = await callEndpoint();
    reset();
  };
  return (
    <>
      <FormProvider {...{ register, errors }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              bgcolor: "grey.300",
              borderRadius: "30px",
              p: "50px",
              width: "50%",
            }}
          >
            <Input name="username" label="Username"  type='text'/>
            <Input name="password" label="Password" type='text'/>
            <Button isDirty={isDirty} isValid={isValid} type={'submit'}>
              Sign in
            </Button>
          </Box>
        </form>
      </FormProvider>
      <DisplayFormValues
        isDirty={isDirty}
        isValid={isValid}
        values={{ username: userNameWatch, password: passwordWatch }}
      />
    </>
  );
}


