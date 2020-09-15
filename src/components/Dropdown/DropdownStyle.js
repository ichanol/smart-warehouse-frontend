import styled from 'styled-components'

const Dropdown = styled.select`
  width: 50%;
  padding: 10px;
  font-size: 20px;
  outline: 0;
  border: 0px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const Choice = styled.option`
  font-size: 20px;
  border-radius: 10px;
`

export { Dropdown, Choice }
