import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  isDirty: boolean;
  isValid: boolean;
  children?: any;
  type?: string;
  values?: Object | undefined;
};

const DisplayFormValues = ({ isDirty, isValid, values}: Props) => {
  return (
    <>
      <Box color="gray.600" mt="10px">
        {isDirty && isValid && (
          <>
            <Typography>Username:{values.username}</Typography>
            <Typography>Password:{values.password}</Typography>
          </>
        )}
      </Box>
    </>
  );
};
export default DisplayFormValues;