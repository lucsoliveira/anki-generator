import { TextField } from "@mui/material";

export function TextAreaInput({
  value,
  placeholder,
  label,
  onChange,
}: {
  value: string;
  placeholder: string;
  label: string;
  onChange: (value: string) => unknown;
}) {
  return (
    <TextField
      id="outlined-multiline-flexible"
      label={label}
      multiline
      maxRows={4}
      value={value}
      placeholder={placeholder}
      onChange={(event) => {
        onChange(event.currentTarget.value);
      }}
    />
  );
}
