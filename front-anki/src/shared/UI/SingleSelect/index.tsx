import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
const SelectStyle = styled.select``;

export function SingleSelect() {
  return (
    <SelectStyle className="form-select" aria-label="Idioma de entrada">
      <option selected>Idioma de entrada</option>
      <option value="3">PT-BR</option>
      <option value="3">EN</option>
    </SelectStyle>
  );
}
