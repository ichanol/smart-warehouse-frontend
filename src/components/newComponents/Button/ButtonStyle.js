import styled from 'styled-components'

const Submit = styled.button`
  width: 100px;
  height: 45px;
  outline: none;
  border: none;
  border-radius: 8px;
  color: white;
  letter-spacing: 2px;
  background-color: #1fe073;
  font-weight: bold;
  transition: all 0.15s ease-in-out;
  :active {
    background-color: #15c15d;
  }
`
const Cancel = styled(Submit)`
  color: #eb2d2d;
  background-color: transparent;
  border: 3px solid #eb2d2d;
  :active {
    color: white;
    background-color: #eb2d2d;
  }
`
const Retry = styled(Submit)`
  color: #04adf6;
  background-color: transparent;
  border: 3px solid #04adf6;
  :active {
    color: white;
    background-color: #04adf6;
  }
`

export { Submit, Cancel, Retry }
