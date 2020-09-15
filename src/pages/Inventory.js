import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const setStart = (date) => {
    setStartDate(date)
  }

  const setEnd = (date) => {
    setEndDate(date)
  }

  const listBalance = async () => {
    const response = await fetch('http://localhost:8000/api/smart-warehouse/product-balance')
    const body = await response.json()
    setData(body.result)
    return body
  }

  const submitFilter = () => {
    axios({
      url: 'http://localhost:8000/api/smart-warehouse/product-transaction?',
      method: 'get',
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        throw err
      })
  }

  useEffect(() => {
    listBalance()
  }, [])

  return (
    <Container>
      <Navbar />
      <Header>
        <Head>Inventory</Head>
      </Header>
      <Content>
        <FilterBlock>
          <Filter start={startDate} end={endDate} setStart={setStart} setEnd={setEnd} submitFilter={submitFilter} />
        </FilterBlock>
        <TableBlock>
          <InventoryTable data={data} />
        </TableBlock>
      </Content>
    </Container>
  )
}

export default Inventory
