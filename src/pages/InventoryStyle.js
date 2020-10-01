import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
`

const Empty = styled.div`
  flex: 0.2;
  /* background-color: lightcoral; */
`

const Head = styled.label`
  flex: 0.6;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #FFF;
  /* background-color: lightblue; */
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonBlock = styled.div`
  display: flex;
  flex: 0.2;
  flex-direction: row;
  justify-content: flex-end;
  /* background-color: green; */
`

const FilterBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 25%;
`

const TableBlock = styled.div`
  padding: 20px;
`


export { Container, Header, Head, Content, FilterBlock, TableBlock, ButtonBlock, Empty }
