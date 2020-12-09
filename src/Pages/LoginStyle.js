import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;

  background-color: ${COLORS.gray[400]};
`

const Form = styled.div`
  display: block;
  width: 330px;

  padding: 30px;
  border-radius: 30px;

  filter: blur(${({ blur }) => (blur ? 5 : 0)}px);
  background-color: ${COLORS.natural.white};
`

const Header = styled.div`
  margin-bottom: 20px;

  font-size: ${FONT.xl};
  text-align: center;
`

const Head = styled.div`
  font-weight: 900;
  color: ${COLORS.natural.black};
`

const Input = styled.input`
  width: 100%;

  padding: 10px;
  padding-left: 20px;
  border: 0;
  border-radius: 20px;

  outline: 0;
  font-size: ${FONT.l};
  background-color: ${COLORS.gray[100]};
`

const Error = styled.div`
  height: 20px;

  margin-bottom: 10px;
  padding-left: 20px;

  color: ${COLORS.natural.red};
`

const Button = styled.button`
  width: 100%;
  height: 50px;

  border-radius: 30px;

  font-size: ${FONT.xl};
  font-weight: bold;
  color: ${COLORS.natural.white};
  background-color: ${COLORS.green[500]};

  &:hover {
    background-color: ${COLORS.green[600]};
    transition: 0.3s;
  }
  &:active {
    background-color: #${COLORS.green[700]};
  }
`

export { Container, Form, Header, Head, Input, Error, Button }
