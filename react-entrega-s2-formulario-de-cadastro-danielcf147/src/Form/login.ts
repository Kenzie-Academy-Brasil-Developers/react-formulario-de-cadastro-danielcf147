import styled from "styled-components";

const Form2 = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  color: white;
  padding: 0px 16.2426px;
  gap: 10.15px;
  span {
    color: red;
    font-size: 10px;
  }
  label {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12.182px;
    line-height: 0px;
    color: #f8f9fa;
  }
  input {
    padding: 0px 16.2426px;
    gap: 10.15px;

    width: 90%;
    height: 35px;
    color: #868e96;
    background: #343b41;

    border: 1.2182px solid #343b41;
    border-radius: 4px;
  }
  select {
    padding: 0px 16.2426px;
    gap: 10.15px;
    color: #868e96;
    width: 90%;
    height: 35px;

    background: #343b41;

    border: 1.2182px solid #343b41;
    border-radius: 4px;
    width: 275px;
  }
  button {
    background-color: #ff577f;
    color: white;
    border: 1.2182px solid #59323f;
    border-radius: 4px;
    height: 40px;
    width: 275px;
  }
`;
export default Form2;
