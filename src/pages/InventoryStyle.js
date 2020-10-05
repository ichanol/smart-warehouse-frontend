import styled from 'styled-components'

const Container = styled.div`
`

const Header = styled.div`
  display: flex;
  /* align-items: center; */
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding: 20px;
  width: 100%;
`

const TableBlock = styled.div`
  padding: 0 20px;
`

const Input = styled.input`
  /* margin-right: 5px; */
  /* width: 500px; */
  height: 40px;
  outline: 0;
  border: 0;
  border-bottom: 3px solid lightgray;
  outline: 0;
  font-size: 16px;
  width: 50%;
  padding-left: 10px;

  &&:focus {
    transition: 0.7s;
    border-bottom: 3px solid #ff9e1f;
  } 
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
`

const Block = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5px;
`

const DateBlock = styled.div`
  width: 400px;
`

export { Container, Header, Content, FilterBlock, TableBlock, Input, Form, Block, DateBlock }
