import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

const moment = require('moment')

function History() {

  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const setStart = (date) => {
    setStartDate(date)
  }

  const setEnd = (date) => {
    setEndDate(date)
  }

  const listHistory = async () => {
    const response = await fetch('http://192.168.56.1:8000/product-history')
    const body = await response.json()
    setData(body)
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
    listHistory()
  }, [])

  return (
    <Container>
      <Navbar />
      <Header>
        <Head>History</Head>
      </Header>
      <Content>
        <FilterBlock>
          <Filter start={startDate} end={endDate} setStart={setStart} setEnd={setEnd} submitFilter={submitFilter} />
        </FilterBlock>
        <TableBlock>
          <Historytable data={data} />
        </TableBlock>
      </Content>
      <ButtonBlock>
        <ExportBtn />
      </ButtonBlock>
    </Container>
  )
}

export default History
