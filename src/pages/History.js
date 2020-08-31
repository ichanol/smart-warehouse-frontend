import React from 'react'
import { Navbar, Filter, Historytable, ExportBtn } from '../components'
import {
  Container,
  Header,
  Head,
  Content,
  FilterBlock,
  TableBlock,
  ButtonBlock,
} from './HistoryStyle'

function History() {

  return (
    <Container>
      <Navbar />
      <Header>
        <Head>History</Head>
      </Header>
      <Content>
        <FilterBlock>
          <Filter />
        </FilterBlock>
        <TableBlock>
          <Historytable />
        </TableBlock>
      </Content>
      <ButtonBlock>
        <ExportBtn />
      </ButtonBlock>
    </Container>
  )
}

export default History
