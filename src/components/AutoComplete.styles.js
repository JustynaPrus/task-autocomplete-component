import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
  }
  h2 {
    margin: 10px 0;
    text-transform: uppercase;
    font-weight: 200;
    font-size: 18px;
    text-align: center;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .active {
    background: lightgray;
  }
  .visible {
    display: block;
  }
  .hide {
    display: none;
  }
`;

export const InputContainer = styled.div`
  min-height: 30px;
  width: 80%;
  display: flex;
  align-items: center;
  border: 1px solid #dcdcdc;
  padding: 2px;
  input {
    border: none;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  li {
    display: flex;
    align-items: center;
    background-color: #dcdcdc;
    border-radius: 3px;
    padding: 4px 0 4px 4px;
    margin: 2px;
  }
  form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  button {
    border: none;
    text-transform: uppercase;
    border-radius: 3px;
    padding: 8px 16px;
    background-color: #dcdcdc;
  }
`;

export const StyledList = styled.ul`
  width: 80%;
  padding: 2px;
  border: 1px solid #dcdcdc;
  li {
    text-align: left;
    padding: 2px;
  }
`;
