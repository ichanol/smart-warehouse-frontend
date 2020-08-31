import styled from 'styled-components'

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
`

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0px auto;
  padding: 20px;
  width: 50%;
  border-radius: 30px;
  background-color: #F8F8F8;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

const Header = styled.div`
  padding: 20px;
  text-align: center;
`

const Head = styled.label`
  font-size: 30px;
  font-weight: bold;
  color: #292A73;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding:  20px;

`

const TopicBlock = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
`

const Topic = styled.label`
  margin-bottom: 25px;
  font-size: 23px;
  font-weight: bold;
  color: #292A73;
`

const InputBlock = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  margin-bottom: 25px;
  padding-left: 15px;
  font-size: 23px;
  border: 1px solid #FFF;
  border-radius: 30px; 
  outline: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`
const Textarea = styled.textarea`
  resize: none; 
  height: 100px;
  padding-left: 15px;
  font-size: 23px;
  border: 1px solid #FFF;
  border-radius: 15px;
  outline: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const BlockBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`

export { Container, Form, Header, Head, TopicBlock, Topic, InputBlock, Content, Input, Textarea, BlockBtn }
