import { COLORS } from '../Constant'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  background-color: ${COLORS.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`

const Form = styled.div`
  display: block;
  background-color: ${COLORS.natural.white};
  width: 330px;
  padding: 30px;
  border-radius: 30px;
  filter: blur(${({ blur }) => blur ? 5 : 0}px);
`

const Header = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`

const Head = styled.div`
  font-weight: 900;
  color: ${COLORS.natural.black};
`

const Input = styled.input`
  background-color: ${COLORS.gray[100]};
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
  color: ${COLORS.natural.red};
`

const Button = styled.button`
  color: ${COLORS.natural.white};
  background-color: ${COLORS.green[500]};
  width: 100%;
  height: 50px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: ${COLORS.green[600]};
    transition: 0.3s;
  }
  &:active {
    background-color: #${COLORS.green[700]};
  }
`

export { Container, Form, Header, Head, Input, Error, Button }
