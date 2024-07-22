import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function InputDatePicker({
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
      render={({ field }) => (
        <FormControl
          fullWidth
          error={errors?.[name]?.message}
          sx={{ marginTop: -1 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ paddingTop: 1 }}>
              <DatePicker
                disabled={disabled}
                label={label}
                id={name}
                name={name}
                sx={{
                  width: "100%",
                }}
                {...field}
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormHelperText>{errors?.[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default InputDatePicker;
