import React, { useEffect, useState } from 'react'
import {
  ActionsDropdown,
  TransactionTable,
} from '../components'
import {
  Container,
  FilterBlock,
  Input,
} from '../Pages/TransactionStyle'

import { Datepicker } from '../components/Datepicker'
import axios from 'axios'

import { SearchIcon, CrossIcon } from '../components/Icon'

const moment = require('moment')

function Transaction() {
  const [data, setData] = useState([])
  const [date, setDate] = useState({ start: '', end: '' })
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' }) // DESC === Down || ASC === UP
  const [column, setColumn] = useState('')
  const [amount, setAmount] = useState({ start: '', end: '' })

  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)

  const today = moment()
  const filter = `${column}=${selected}` // Column=value

  const handleSelect = (option) => {
    setSelected(option)
    setOpen(!open)
    setColumn('action')
  }
  const toggle = () => setOpen(!open)


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
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${date.start}&enddate=${date.end}&column=${sort.column}&sort=${sort.sortDirection}&${filter}&keyword=${keyword}&start=${amount.start}&end=${amount.end}`
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


  const search = (event) => setKeyword(event.target.value)

  useEffect(() => {
    transactionList()
    sortApi()
  }, [sort, keyword, selected, date, amount])

  return (
    <Container>
      <div className='header'>
        <span>Transaction</span>
        <FilterBlock>
          <div className='filter'>
            <div className='search'>
              <Input
                name='search'
                placeholder='Search ID, Name or Reporter'
                value={keyword}
                onChange={search}
              />
              {keyword === '' ? <></> : <i className='clearIcon' onClick={() => setKeyword('')}><CrossIcon /></i>}

              <div className='searchIcon'><SearchIcon /></div>
            </div>
            <div className='amount-wrap'>
              <div className='amount'>
                <Input
                  placeholder='Min'
                  value={amount.start}
                  type='number'
                  onChange={(event) => {
                    setAmount({
                      start: event.target.value,
                      end: amount.end,
                    })
                  }}
                />
                {amount.start === '' ? <></> : <div className='amount-start' onClick={() => setAmount({ start: '', end: amount.end })}><CrossIcon /></div>}
                <Input
                  placeholder='Max'
                  value={amount.end}
                  type='number'
                  onChange={(event) => {
                    setAmount({
                      start: amount.start,
                      end: event.target.value,
                    })
                  }}
                />
                {amount.end === '' ? <></> : <div className='amount-end' onClick={() => setAmount({ start: amount.start, end: '' })}><CrossIcon /></div>}
              </div>
            </div>
            <div>
              <Datepicker
                date={date}
                setStart={setStart}
                setEnd={setEnd}
              />
            </div>
            <div>
              <ActionsDropdown
                handleSelect={handleSelect}
                selected={selected}
                handleToggle={toggle}
                open={open}
              />
            </div>
          </div>
        </FilterBlock>
      </div>
      <div className='content'>
        <TransactionTable
          data={data}
          handleSort={handleSort}
          sort={sort}
        />
      </div>
    </Container >
  )
}

export default Transaction
