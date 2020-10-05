import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Datepicker, InventoryTable, SearchDropdown, ClearBtn, SubmitBtn } from '../../components'
import {
  Container,
  Header,
  Content,
  FilterBlock,
  TableBlock,
  Input,
  Form,
} from '../../pages/InventoryStyle'

function ProductList() {
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterSelected, setFilterSelected] = useState('')
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' })

  const filter = `${filterSelected}=${keyword}`

  const handleSort = (name) => {
    return sort.column === name ?
      setSort({
        column: name,
        isSortUp: !sort.isSortUp,
        sortDirection: sort.isSortUp ? 'ASC' : 'DESC',
      }) :
      setSort({
        column: name,
        isSortUp: true,
        sortDirection: 'DESC',
      })
  }

  const clear = () => {
    setStartDate('')
    setEndDate('')
    setFilterSelected('')
    setKeyword('')
  }

  const dropdownSelected = (e) => {
    setFilterSelected(e.target.value)
  }

  const sortApi = () => {
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&column=${sort.column}&sort=${sort.sortDirection}`
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

  const listBalance = async () => {
    const URL = 'http://localhost:8000/api/smart-warehouse/product-balance'
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

  const submitFilter = () => {
    axios({
      url: `http://localhost:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&${filter}`,
      method: 'get',
    })
      .then(res => {
        setData(res.data.result)
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
    listBalance()
    sortApi()
  }, [sort])

  return (
    <Container>
      <Header>
        <FilterBlock>
          <div>
            <SearchDropdown
              selected={dropdownSelected}
              filterSelected={filterSelected}
            />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <Datepicker
            start={startDate}
            end={endDate}
            setStart={setStart}
            setEnd={setEnd}
          />
          <Form>
            <ClearBtn clear={clear} />
            <SubmitBtn submitFilter={submitFilter} />
          </Form>
        </FilterBlock>
      </Header>
      <Content>
        <TableBlock>
          <InventoryTable
            data={data}
            handleSort={handleSort}
          />
        </TableBlock>
      </Content>
    </Container>
  )
}

export default ProductList
