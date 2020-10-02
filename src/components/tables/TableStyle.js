import styled from 'styled-components'

const Wrapper = styled.div`
  height: 600px;
  max-width: 100%;
  display: flex;
`

const Table = styled.table`
`

const Top = styled.thead`
  background-color: #3e4491;
`

const No = styled.th`
  width: 5%;
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
  background-color: red;
`

const Id = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Name = styled.th`
  width: 15%;
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Amount = styled.th`
  width: 5%;
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Company = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Time = styled.th`
  width: 20%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Description = styled.th`
  width: 20%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Actions = styled.th`
  width: 10%;
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
`

const Body = styled.tbody`
  background-color: #fff;
`

const Row = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  color: #292a73;
  border-bottom: solid 2px rgba(62, 68, 145, 0.1);
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

export {
  Wrapper,
  Table,
  Top,
  Body,
  No,
  Id,
  Name,
  Amount,
  Company,
  Time,
  Description,
  Actions,
  Trow,
  Row,
  Action,
}
