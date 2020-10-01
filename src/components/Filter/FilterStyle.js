import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  background-color: #F8F8F8;
  border-radius: 30px;
  border: 1px solid black;
`

const Header = styled.div`
  padding: 20px;
  text-align: center;
`

const Head = styled.label`
  font-size: 25px;
  font-weight: bold;
  color: #292A73;
`

const DateBlock = styled.div`
  display: flex;
  padding: 20px;
  align-self: center;
`

const FilterBlock = styled.div`
  height: 100%;
`

const Form = styled.form`
  padding: 20px;
`

const Input = styled.input` 
  width: 10px;
  border: 0;
  border-bottom: 3px solid lightgray;
  outline: 0;
  font-size: 20px;
  width: 50%;
  padding-left: 10px;
  background-color: #F8F8F8;
  color: #292A73;

  &&:focus {
    transition: 0.7s;
    border-bottom: 3px solid #292A73;
  }
`

const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
`

export { Wrapper, Header, Head, DateBlock, FilterBlock, Form, Input, Block }
