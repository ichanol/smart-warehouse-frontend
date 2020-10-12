import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Datepicker, ProductListTable, ClearBtn, FilterBtn } from '../../components'
import {
  Container,
  Header,
  Head,
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
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' })

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
    setKeyword('')
  }

  const sortApi = () => {
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&column=${sort.column}&sort=${sort.sortDirection}&keyword=${keyword}`
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
      url: `http://localhost:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}`,
      method: 'get',
    })
      .then(res => {
        setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
    setKeyword(keyword)
    setStart(startDate)
    setEndDate(endDate)
  }

  useEffect(() => {
    listBalance()
    sortApi()
  }, [sort, keyword])

  return (
    <Container>
      <Header>
        <Head>Product List</Head>
        <FilterBlock>
          <div className='filter'>
            <div className='search'>
              Search
            <Input
                placeholder='Search ID or Name'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              Date
              <Datepicker
                start={startDate}
                end={endDate}
                setStart={setStart}
                setEnd={setEnd}
              />
            </div>
          </div>
          <Form>
            <ClearBtn clear={clear} />
            <FilterBtn submitFilter={submitFilter} />
          </Form>
        </FilterBlock>
      </Header>
      <Content>
        <TableBlock>
          <ProductListTable
            data={data}
            handleSort={handleSort}
          />
        </TableBlock>
      </Content>
    </Container>
  )
}

export default ProductList
