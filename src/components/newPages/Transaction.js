import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Historytable, ExportBtn } from '../../components'
import {
  Container,
  Header,
  Content,
  FilterBlock,
  TableBlock,
} from '../../pages/HistoryStyle'

const moment = require('moment')

function Transaction() {
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState('') // StartDate
  const [endDate, setEndDate] = useState('') // EndDate
  const [filterSelected, setFilterSelected] = useState('')
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' }) // DESC === Down || ASC === UP

  const today = moment()
  const filter = `${filterSelected}=${keyword}` // Column=value

  const listHistory = async () => {
    const start = moment('1998-11-09')
    const URL = `http://localhost:8000/api/smart-warehouse/product-transaction?startdate=${start}&enddate=${today}`
    axios({
      url: URL,
    })
      .then(res => {
        setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
  }

  const handleSort = (name) => {
    if (sort.column === name) {
      setSort({
        column: name,
        isSortUp: !sort.isSortUp,
        sortDirection: sort.isSortUp ? 'ASC' : 'DESC',
      })
    } else {
      setSort({
        column: name,
        isSortUp: true,
        sortDirection: 'DESC',
      })
    }
  }

  const sortApi = () => {
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&column=${sort.column}&sort=${sort.sortDirection}&${filter}`
    axios({
      url: URL,
      method: 'get',
    })
      .then(res => {
        setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
  }

  const setStart = (date) => {
    setStartDate(date)
  }

  const setEnd = (date) => {
    setEndDate(date)
  }

  const dropdownFilter = (e) => {
    setFilterSelected(e.target.value)
  }

  const search = (e) => {
    setKeyword(e.target.value)
  }

  const clear = () => {
    setStartDate('')
    setEndDate('')
    setFilterSelected('')
    setKeyword('')
  }

  const submitFilter = (e) => {
    const URL = `http://localhost:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&${filter}`
    axios({
      url: URL,
      method: 'get',
    })
      .then(res => {
        return res.data.result === undefined
          ? setData([])
          : setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
    setFilterSelected(filterSelected)
    setKeyword(keyword)
    setStart(startDate)
    setEndDate(endDate)
  }

  useEffect(() => {
    listHistory()
    sortApi()
  }, [sort])

  return (
    <Container>
      <Header>
        <FilterBlock>
          <Filter
            start={startDate}
            end={endDate}
            setStart={setStart}
            setEnd={setEnd}
            submitFilter={submitFilter}
            filterSelected={filterSelected}
            keyword={keyword}
            search={search}
            dropdownFilter={dropdownFilter}
            clear={clear}
          />
        </FilterBlock>
      </Header>
      <Content>
        <TableBlock>
          <Historytable
            data={data}
            handleSort={handleSort}
            sort={sort}
          />
        </TableBlock>
      </Content>
    </Container>
  )
}

export default Transaction
