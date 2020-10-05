import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const DateBlock = styled.div`
  width: 400px;
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
`

const Input = styled.input`
  width: 50%;
  height: 40px;
  outline: 0;
  border: 0;
  border-bottom: 3px solid lightgray;
  outline: 0;
  font-size: 16px;
  width: 50%;
  padding-left: 10px;
  color: #292A73;

  &&:focus {
    transition: 0.7s;
    border-bottom: 3px solid #ff9e1f;
  } 
`

const Block = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5px;
`

export { Wrapper, DateBlock, Form, Input, Block }
