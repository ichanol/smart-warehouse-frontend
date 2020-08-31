import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0px auto;
  height: 500px;
  width: 100%;
`

const Table = styled.table`
  width: 100%;
  border: 1px solid #3E4491;
`

const Top = styled.thead`
  background-color: #3E4491;
`

const Head = styled.th`
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Body = styled.tbody`
  background-color: #FFF;
`

const Row = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  color: #292A73;
  border-bottom: solid 2px rgba(62,68,145,0.1);
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

export { Wrapper, Table, Top, Head, Body, Trow, Row }
