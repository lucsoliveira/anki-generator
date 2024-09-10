//gere um estilo de navbar com styled components, navbar lateral
import styled from "styled-components";

//o nav bar deve ocupar toda a tela no height
export const NavBarStyle = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 200px;
  background-color: var(--accents-2);
  padding: 1rem;
  /* position: fixed; */
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid var(--accents-3);
  z-index: 1000;
`;

export const MenuStyle = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  li:hover {
    background-color: var(--accents-1);
  }
`;
