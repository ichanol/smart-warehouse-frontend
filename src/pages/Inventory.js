import React from 'react'
import { Navbar, Filter, InventoryTable } from '../components'
import {
  Container,
  Header,
  Head,
  Content,
  FilterBlock,
  TableBlock,
} from './InventoryStyle'

function Inventory() {

  return (
    <Container>
      <Navbar />
      <Header>
        <Head>Inventory</Head>
      </Header>
      <Content>
        <FilterBlock>
          <Filter />
        </FilterBlock>
        <TableBlock>
          <InventoryTable />
        </TableBlock>
      </Content>
    </Container>
  )
}

export default Inventory
