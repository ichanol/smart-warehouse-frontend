import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #e6eff0;
  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .header span {
    font-size: 22px;
  }
  .content {
    flex: 1;
    background-color: white;
    padding: 25px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 0 20px;
  font-size: 18px;
`

const Head = styled.label`
  font-size: 30px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  .filter {
    display: flex;
    flex-direction: row;
  }
  .search { 
    padding-right: 20px;
  }
`

const TableBlock = styled.div`
  padding: 0 20px;
`

const Input = styled.input`
  height: 50px;
  outline: 0;
  border: 0;
  border-bottom: 3px solid lightgray;
  outline: 0;
  font-size: 16px;
  width: 100%;
  padding-left: 10px;

  &&:focus {
    transition: 0.7s;
    border-bottom: 3px solid #ff9e1f;
  } 
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
  position: relative;
  top: 15px;
`

const Block = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5px;
`

const DateBlock = styled.div`
  width: 400px;
`

const Empty = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%) */
`

export { Container, Header, Head, Content, FilterBlock, TableBlock, Input, Form, Block, DateBlock, Empty }
