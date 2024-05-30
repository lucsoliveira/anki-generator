import styled from 'styled-components';
const BoxStyle = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export function Box({
  children,
  padding,
}: {
  children: any;
  padding: string | number;
}) {
  return (
    <BoxStyle
      style={{
        padding,
      }}
    >
      {children}
    </BoxStyle>
  );
}
