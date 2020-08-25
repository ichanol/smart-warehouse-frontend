import styled from 'styled-components'

const Wrapper = styled.div`
  max-height: 500px;
  width: 75%;
  overflow: auto;
`

const Table = styled.table`
  width: 100%;
`

const Top = styled.thead`
  background-color: rgba(240,128,128);
`

const Body = styled.tbody`
  background-color: #FFF;
`

const Head = styled.th`
  padding: 20px 15px;
  text-align: left;
  font-size: 16px;
  color: #FFF;
  text-transform: uppercase;
`

const Row = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  color: lightcoral;
  border-bottom: solid 2px rgba(240,128,128,0.1);
`

const Trow = styled.tr`
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  &:active {
    background-color: #FFF;
  }
`
export { Wrapper, Table, Top, Body, Head, Trow, Row }
