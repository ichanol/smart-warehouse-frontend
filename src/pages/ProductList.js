import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Datepicker,
  ProductListTable,
} from '../components'
import {
  Container,
  Input,
} from '../Pages/ProductListStyle'
import { CrossIcon, SearchIcon } from '../components/Icon'

function ProductList() {
  const [data, setData] = useState([])
  const [date, setDate] = useState({ start: '', end: '' })
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

  const sortApi = () => {
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${date.start}&enddate=${date.end}&column=${sort.column}&sort=${sort.sortDirection}&keyword=${keyword}`
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

  const setStart = (dateStart) => setDate({ start: dateStart, end: date.end })

  const setEnd = (dateEnd) => setDate({ start: date.start, end: dateEnd })

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

  useEffect(() => {
    listBalance()
    sortApi()
  }, [sort, keyword, date])

  return (
    <Container>
      <div className='header'>
        <span>Product List</span>
        <div className='filter'>
          <div className='search'>
            <Input
              placeholder='Search ID or Name'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword === '' ? <></> : <i className='clear-icon' onClick={() => setKeyword('')}><CrossIcon /></i>}
            <div className='search-icon'><SearchIcon /></div>
          </div>
          <div>
            <Datepicker
              date={date}
              setStart={setStart}
              setEnd={setEnd}
            />
          </div>
        </div>
      </div>
      <div className='content'>
        <ProductListTable
          data={data}
          handleSort={handleSort}
        />
      </div>
    </Container>
  )
}

export default ProductList
