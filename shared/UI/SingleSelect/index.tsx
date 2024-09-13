import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SingleSelectInput({
  children,
  value,
  label,
  onChange,
  helperText,
}: {
  children: React.ReactNode;
  value: string | undefined;
  onChange: (value: string) => unknown;
  label: string;
  helperText?: string;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    console.log({ event });
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        // id="demo-simple-select-helper"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {children}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

function SingleSelectItem({
  value,
  key,
  children,
}: {
  key: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <MenuItem key={key} value={value}>
      {children}
    </MenuItem>
  );
}

export const SingleSelect = {
  Selector: SingleSelectInput,
  Item: SingleSelectItem,
};
