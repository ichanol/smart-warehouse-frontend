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

const DateStart = styled.input`
  margin-right: 0px;
  padding-left: 10px;
  font-size: 20px;
  height: 40px;
  border: 0;
  outline: 0;
  border-radius: 30px 0px 0px 30px;  
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const DateEnd = styled.input`
  margin-left: 0px;
  padding-left: 10px;
  font-size: 20px;
  height: 40px;
  border: 0;
  outline: 0;
  border-radius: 0px 30px 30px 0px;
  border-left: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const FilterBlock = styled.div`
  padding: 20px;
  height: 50%;
`

const Form = styled.form`
  padding: 20px;
`

const Dropdown = styled.select`
  width: 50%;
  padding: 10px;
  font-size: 20px;
  outline: 0;
  border: 0px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const Choice = styled.option`
  font-size: 20px;
  border-radius: 10px;
`

const ButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`

export { Wrapper, Header, Head, DateBlock, DateStart, DateEnd, FilterBlock, Form, Dropdown, Choice, ButtonBlock }
