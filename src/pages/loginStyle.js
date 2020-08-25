import styled from 'styled-components'

const Form = styled.div`
  display: block;
  background-color: #ffffff;
  width: 330px;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  filter: blur(${(props) => props.blur ? 5 : 0}px);
`

const Header = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`

const Head = styled.div`
  font-weight: 900;
  color: lightcoral;
`

const Input = styled.input`
  background-color: #f2f2f2;
  outline: 0;
  font-size: 16px;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  padding-left: 20px;
  border: 0;
  border-radius: 20px;
`

const Button = styled.button`
  background-color: lightcoral;
  color: #ffffff;
  outline: 0;
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  align-content: center;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`

export { Form, Header, Head, Input, Button, Container }
