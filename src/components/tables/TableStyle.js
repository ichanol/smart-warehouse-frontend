import styled from 'styled-components'

const Wrapper = styled.div`
  height: 600px;
  overflow: auto;
`

const Table = styled.table`
  width: 100%;
  border: solid 2px rgba(62,68,145,0.1);
`

const Top = styled.thead`
  background-color: #1C1C1C;
`

const No = styled.th`
  width: 3%;
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
  width: 10%;
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
  width: 15%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Description = styled.th`
  width: 15%;
  padding: 20px 15px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Actions = styled.th`
  width: 15%;
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
  /* width: 10%; */
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
  border: solid 2px rgba(62,68,145,0.1);
`

const Trow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`

const Action = styled.div`
  display: flex;
  flex-direction: row;
`

export { Wrapper, Table, Top, Body, No, Id, Name, Amount, Company, Time, Description, Actions, Ref, Reporter, Trow, Row, Action }
