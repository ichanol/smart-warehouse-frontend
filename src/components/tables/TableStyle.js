import styled from 'styled-components'

const Wrapper = styled.div`
  height: 600px;
  overflow: auto;
`

const Table = styled.table`
  width: 100%;
  border: 1px solid #3E4491;
`

const Top = styled.thead`
  background-color: #3E4491;
`

const No = styled.th`
  width: 5%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
  cursor: pointer;
`

const Id = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Name = styled.th`
  width: 15%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Amount = styled.th`
  width: 5%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Company = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Time = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Description = styled.th`
  width: 20%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Actions = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Ref = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Reporter = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Body = styled.tbody`
  background-color: #FFF;
`

const Row = styled.td`
  padding: 15px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  color: #292A73;
  border-bottom: solid 2px rgba(62,68,145,0.1);
  border-right: solid 2px rgba(62,68,145,0.1);
`

const Trow = styled.tr`
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  &:focus {
    background-color: lightgray;
  }
`

const Action = styled.div`
  display: flex;
  flex-direction: row;
`

const Button = styled.button`
  font-size: 16px;
  border: 0;
  outline: 0;
  width: 100%;
  height: 100%; 
  /* background-color: red; */
  background-color: #3E4491;
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: bold;
`

export { Wrapper, Table, Top, Body, No, Id, Name, Amount, Company, Time, Description, Actions, Ref, Reporter, Trow, Row, Action, Button }
