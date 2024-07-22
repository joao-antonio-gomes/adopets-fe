import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

function InputSelect({
  errors,
  name,
  control,
  label,
  options = [],
  defaultValue = "",
  required = false,
  disabled = false,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormControl fullWidth error={errors?.[name]?.message}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} {...field} disabled={disabled}>
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors?.[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default InputSelect;
