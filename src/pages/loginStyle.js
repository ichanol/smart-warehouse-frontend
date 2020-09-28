import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  background-color: #292a73;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`

const Form = styled.div`
  display: block;
  background-color: #ffffff;
  width: 330px;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  filter: blur(${(props) => (props.blur ? 5 : 0)}px);
`

const Header = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`

const Head = styled.div`
  font-weight: 900;
  color: #292a73;
`

const Input = styled.input`
  background-color: #f2f2f2;
  outline: 0;
  font-size: 16px;
  width: 100%;
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
  color: #ffffff;
  background-color: #5cb85c;
  width: 100%;
  height: 50px;
  border: 0;
  outline: 0;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: #2ea22e;
    transition: 0.3s;
  }
  &:active {
    background-color: #5cb85c;
  }
`

export { Container, Form, Header, Head, Input, Error, Button }
