import {
  Container,
  Input,
} from '../Pages/ProductListStyle'
import { CrossIcon, SearchIcon } from '../components/Icon'
import {
  Datepicker,
  ProductListTable,
} from '../components'
import React, { useEffect, useState } from 'react'

import { atomState } from '../Atoms'
import { getRequest } from '../Services'
import { useRecoilValue } from 'recoil'

const ProductList = () => {
  const [data, setData] = useState([])
  const [date, setDate] = useState({ start: '', end: '' })
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' })
  const TOKEN = useRecoilValue(atomState.userState)

  const params = {
    startdate: `${date.start}`,
    enddate: `${date.end}`,
    column: `${sort.column}`,
    sort: `${sort.sortDirection}`,
    keyword: `${keyword}`,
  }

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

  const productList = () => {
    getRequest('/product-transaction', params, TOKEN, 'get')
      .then(res => setData(res.result))
      .catch(err => {
        throw err
      })
  }

  const setStart = (dateStart) => setDate({ start: dateStart, end: date.end })

  const setEnd = (dateEnd) => setDate({ start: date.start, end: dateEnd })

  useEffect(() => {
    productList()
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
            {keyword && <i className='clear-icon' onClick={() => setKeyword('')}><CrossIcon /></i>}
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
