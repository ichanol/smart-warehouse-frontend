import styled from 'styled-components'

const Button = styled.button`
  border: 1px solid white;
  margin: 20px;
  border-radius: 30px;
  outline: 0;
  width: 150px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

  &:hover { 
    background-color: lightpink;
    transition: 0.3s;
  }
  &:active {
    background-color: lightcoral;
  }
`

export default Button
