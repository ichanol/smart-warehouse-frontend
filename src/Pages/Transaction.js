import {
  Container,
  FilterBlock,
  Input,
} from '../Pages/TransactionStyle'
import { CrossIcon, SearchIcon } from '../components/Icon'
import React, { useEffect, useState } from 'react'

import { Datepicker } from '../components/Datepicker'
import {
  TransactionTable,
} from '../components'
import { atomState } from '../Atoms'
import { getRequest } from '../Services'
import { useRecoilValue } from 'recoil'

function Transaction() {
  const [data, setData] = useState([])
  const [date, setDate] = useState({ start: '', end: '' })
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' }) // DESC === Down || ASC === UP
  const [amount, setAmount] = useState({ start: '', end: '' })

  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)

  const TOKEN = useRecoilValue(atomState.userState)

  const params = {
    startdate: `${date.start}`,
    enddate: `${date.end}`,
    column: `${sort.column}`,
    sort: `${sort.sortDirection}`,
    action: `${selected}`,
    keyword: `${keyword}`,
    start: `${amount.start}`,
    end: `${amount.end}`,
  }

  const handleSelect = (option) => {
    setSelected(option)
    setOpen(!open)
  }
  const toggle = () => setOpen(!open)

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

  const transactionList = () => {
    getRequest('/product-transaction', params, TOKEN.accessToken, 'get')
      .then(res => setData(res.result))
      .catch(err => {
        throw err
      })
  }

  const setStart = (dateStart) => setDate({ start: dateStart, end: date.end })

  const setEnd = (dateEnd) => setDate({ start: date.start, end: dateEnd })

  const search = (event) => setKeyword(event.target.value)

  useEffect(() => {
    transactionList()
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
              {keyword && <i className='clearIcon' onClick={() => setKeyword('')}><CrossIcon /></i>}

              <div className='searchIcon'><SearchIcon /></div>
            </div>
            <div className='amount-wrap'>
              <div className='amount'>
                <Input
                  placeholder='Min amount'
                  className='input-amount-min'
                  value={amount.start}
                  type='number'
                  onChange={(event) => {
                    setAmount({
                      start: event.target.value,
                      end: amount.end,
                    })
                  }}
                />
                {amount.start && <div className='amount-start' onClick={() => setAmount({ start: '', end: amount.end })}><CrossIcon /></div>}
                <Input
                  placeholder='Max amount'
                  className='input-amount-max'
                  value={amount.end}
                  type='number'
                  onChange={(event) => {
                    setAmount({
                      start: amount.start,
                      end: event.target.value,
                    })
                  }}
                />
                {amount.end && <div className='amount-end' onClick={() => setAmount({ start: amount.start, end: '' })}><CrossIcon /></div>}
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
              {/* <ActionsDropdown
                handleSelect={handleSelect}
                selected={selected}
                handleToggle={toggle}
                open={open}
              /> */}
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
