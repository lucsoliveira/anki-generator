import React, { MouseEventHandler } from "react";
import { VariantsBootsrap } from "../types/variants";
import { VariantButton } from "../shareds/utils/variant";

import ButtonMT from "@mui/material/Button";
export function Button({
  children,
  onClick,
  variant,
  disabled,
}: {
  children: any;
  onClick: MouseEventHandler | undefined;
  variant?: VariantsBootsrap;
  disabled?: boolean;
}) {
  return (
    <ButtonMT onClick={onClick} disabled={disabled} variant="contained">
      {children}
    </ButtonMT>
  );
}
