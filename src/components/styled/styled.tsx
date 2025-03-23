import styled from "styled-components";

export const Card = styled.div`
  padding: 12px 12px;
  border-radius: 18px;
  background-color: white;
  margin-bottom: 2vw;
  margin-left: 5vw;
  margin-right: 5vw;
  max-width: 90vw;

  @media (prefers-color-scheme: dark) {
    background-color: #1C1C1E;
  }
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 12px;
  padding: 12px 24px;
  color: var(--tg-theme-button-text-color);
  font-family: 'BoldFont', sans-serif;
  font-size: 1.5vmax;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Input = styled("input")`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #c2c2c2;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;
