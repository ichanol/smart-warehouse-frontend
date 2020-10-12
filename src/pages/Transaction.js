import React, { useEffect, useState } from 'react'
import {
  ActionsDropdown,
  ClearBtn,
  FilterBtn,
  TransactionTable,
} from '../components'
import {
  Container,
  Content,
  FilterBlock,
  Header,
  Input,
  TableBlock,
  AmountInput,
} from '../Pages/TransactionStyle'

import { Datepicker } from '../components/Datepicker'
import axios from 'axios'

const moment = require('moment')

function Transaction() {
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState('') // StartDate
  const [endDate, setEndDate] = useState('') // EndDate
  const [dropdownSelected, setDropdownSelected] = useState('')
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' }) // DESC === Down || ASC === UP
  const [column, setColumn] = useState('')
  const [amount, setAmount] = useState({ start: '', end: '' })


  const today = moment()
  const filter = `${column}=${dropdownSelected}` // Column=value

  const transactionList = async () => {
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
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&column=${sort.column}&sort=${sort.sortDirection}&${filter}&keyword=${keyword}&start=${amount.start}&end=${amount.end}`
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

  const handleDropdownSelect = (e) => {
    setDropdownSelected(e.target.value)
    setColumn('action')
  }

  const search = (event) => {
    setKeyword(event.target.value)
  }

  const clear = () => {
    setStartDate('')
    setEndDate('')
    setDropdownSelected('')
    setKeyword('')
    setAmount({ start: '', end: '' })
  }

  const submitFilter = (e) => {
    e.preventDefault()
    const URL = `http://localhost:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&${filter}&start=${amount.start}&end=${amount.end}`
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
    setDropdownSelected(dropdownSelected)
    setKeyword(keyword)
    setStart(startDate)
    setEndDate(endDate)
  }

  useEffect(() => {
    transactionList()
    sortApi()
  }, [sort, keyword, dropdownSelected])

  return (
    <Container>
      <Header>
        <label>Transaction</label>
        <FilterBlock>
          <div className='filter'>
            <div>
              <label>Search</label>
              <Input
                placeholder='Search ID, Name or Reporter'
                value={keyword}
                onChange={search}
              />
            </div>
            <div className='amount' >
              <label>Amount</label>
              <AmountInput>
                <Input
                  placeholder='Min'
                  value={amount.start}
                  onChange={(event) => {
                    setAmount({
                      start: event.target.value,
                      end: amount.end,
                    })
                  }}
                />
                <Input
                  placeholder='Max'
                  value={amount.end}
                  onChange={(event) => {
                    setAmount({
                      start: amount.start,
                      end: event.target.value,
                    })
                  }}
                />
              </AmountInput>
            </div>
            <div>
              <label>Date</label>
              <Datepicker
                start={startDate}
                end={endDate}
                setStart={setStart}
                setEnd={setEnd}
              />
            </div>
            <div className='action'>
              <label>Action</label>
              <ActionsDropdown
                handleSelect={handleDropdownSelect}
                selected={dropdownSelected}
              />
            </div>
          </div>
          <div className='button'>
            {/* <ClearBtn clear={clear} />
            <FilterBtn submitFilter={submitFilter} /> */}
          </div>
        </FilterBlock>
      </Header>
      <Content>
        <TableBlock>
          <TransactionTable
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
