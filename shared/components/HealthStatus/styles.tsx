import styled from 'styled-components';

export const HealthStatusStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;

export const HealthStatusItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: baseline;
`;

export const StatusCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: black;
`;
