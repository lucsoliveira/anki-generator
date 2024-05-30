import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
const ButtonStyle = styled.button``;

export function Button({
  children,
  onClick,
}: {
  children: any;
  onClick: MouseEventHandler | undefined;
}) {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;
}
