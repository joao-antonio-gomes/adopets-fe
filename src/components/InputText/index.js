import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

function InputText({
  errors,
  name,
  control,
  label,
  required = false,
  disabled = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={(props) => {
        const { field } = props;
        return (
          <TextField
            InputLabelProps={{ shrink: field.value }}
            label={label}
            variant="outlined"
            id={name}
            disabled={disabled}
            name={name}
            fullWidth
            error={errors?.[name]?.message}
            helperText={errors?.[name]?.message || ""}
            {...field}
          />
        );
      }}
    />
  );
}

export default InputText;
