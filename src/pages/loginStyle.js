import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #292A73;
`

const Form = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  width: 330px;
  padding: 30px 30px 30px 30px;
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
  color: #292A73;
`

const Input = styled.input`
  background-color: #f2f2f2;
  outline: 0;
  font-size: 16px;
  width: 90%;
  padding: 10px;
  padding-left: 20px;
  border: 0;
  border-radius: 20px;
`

const Error = styled.div`
  margin-bottom: 10px; 
  padding-left: 20px;
  height: 20px; 
  color: red;
`

const Button = styled.button`
  color: #FFFFFF;
  background-color: #5CB85C;
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover { 
      background-color: #2EA22E;
      transition: 0.3s;
    }
    &:active {
      background-color: #5CB85C;
    }
`

export { Container, Form, Header, Head, Input, Error, Button }
