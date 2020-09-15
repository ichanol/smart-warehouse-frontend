import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  background-color: #F8F8F8;
  border-radius: 30px;
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
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const FilterBlock = styled.div`
  padding: 20px;
  height: 50%;
`

const Form = styled.form`
  padding: 20px;
`

const Input = styled.input`
  border: 0;
  outline: 0;
  font-size: 20px;
  width: 50%;
  padding-left: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const Block = styled.div`
  display: flex;
  justify-content: flex-end;
`

export { Wrapper, Header, Head, DateBlock, FilterBlock, Form, Input, Block }
