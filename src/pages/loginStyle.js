import styled from 'styled-components'

const Form = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  width: 330px;
  padding: 30px 30px 45px 30px;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

const Header = styled.div`
  margin: 20px;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`

const Head = styled.div`
  font-weight: 900;
  color: lightcoral
`

const Input = styled.input`
  background-color: #f2f2f2;
  outline: 0;
  font-size: 16px;
  width: 90%;
  margin-bottom: 15px;
  padding: 10px;
  padding-left: 20px;
  border: 0;
  border-radius: 20px;
`

const Button = styled.button`
  background-color: lightcoral;
  color: #FFFFFF;
  outline: 0;
  width: 100%;
  height: 50px;
  border: 0;
  padding: 18px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  align-content: center;
`

export { Form, Header, Head, Input, Button }
