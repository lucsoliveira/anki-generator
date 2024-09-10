import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { VariantsBootsrap } from "../types/variants";
import { VariantButton } from "../shareds/utils/variant";
const ButtonStyle = styled.button``;

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
    <ButtonStyle
      onClick={onClick}
      className={`btn ${VariantButton[variant ?? "primary"]}`}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  );
}
