import styled from 'styled-components'

const Container = styled.div`
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const ButtonBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const FilterBlock = styled.div`
  position: relative;
  padding: 20px;
  width: 100%;
`

const TableBlock = styled.div`
  padding: 0 20px;
`

export { Container, Header, Content, FilterBlock, TableBlock, ButtonBlock }
