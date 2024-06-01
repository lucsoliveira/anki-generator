import styled from 'styled-components';
const BoxStyle = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export function Box({
  children,
  title,
  padding,
}: {
  title?: string;
  children: any;
  padding?: string | number;
}) {
  return (
    <BoxStyle
      style={{
        padding,
      }}
    >
      <h2>{title}</h2>
      {children}
    </BoxStyle>
  );
}
