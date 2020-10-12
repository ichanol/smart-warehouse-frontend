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
  label {
    font-size: 30px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 0 20px;
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
  .filter label {
    font-size: 18px;
  }
  .amount { 
    width: 20%; 
    padding: 0 20px;
  }
  .action {
    display: flex; 
    flex-direction: column;
  }
  .button {
  display: flex;
  flex-direction: row;
  position: relative;
  top: 15px;
  }
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

const AmountInput = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 50%; */
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const TableBlock = styled.div`
  padding: 0 20px;
`

export { Container, Header, Content, FilterBlock, TableBlock, Input, AmountInput }
