import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SingleSelectInput({
  label,
  onChange,
  helperText,
  values,
  value,
}: {
  value: string | undefined;
  onChange: (value: string) => unknown;
  label: string;
  helperText?: string;
  values: { label: string; value: string }[];
}) {
  const [valueSelected, setValueSelected] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValueSelected(event.target.value);
    onChange(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={valueSelected ?? value}
        label={label}
        onChange={handleChange}
      >
        {values.map((v) => (
          <MenuItem key={v.value} value={v.value}>
            {v.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export const SingleSelect = {
  Selector: SingleSelectInput,
};
