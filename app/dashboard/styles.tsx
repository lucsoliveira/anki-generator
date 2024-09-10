import styled from "styled-components";

//quero que o navbar seja fixo e o content do main seja scroll

export const DashboardLayoutStyle = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--accents-1);

  main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }
`;
