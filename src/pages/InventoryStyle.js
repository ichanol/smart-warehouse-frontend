import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

const Head = styled.label`
  font-size: 30px;
  font-weight: bold;
  color: #FFF;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
`

const FilterBlock = styled.div`
  margin-left: 20px;
  padding: 20px;
  flex: 0.2;
`

const TableBlock = styled.div`
  flex: 0.8;
  padding: 20px;
`

export { Container, Header, Head, Content, FilterBlock, TableBlock }
