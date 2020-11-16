import { Container, FilterBlock, Input } from '../Pages/TransactionStyle'
import { CrossIcon, SearchIcon } from '../components/Icon' //
import {
  DropDown,
  FilterIcon,
  Pagination,
  ResponsiveTable,
  SearchBox,
} from '../components'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Datepicker } from '../components/Datepicker' //
import { TransactionTable } from '../components' //
import { atomState } from '../Atoms'
import { debounce } from 'lodash'
import { request } from '../Services'
import { useHistory } from 'react-router-dom'

const Transaction = () => {
  const history = useHistory()

  const setToastState = useSetRecoilState(atomState.toastState)
  const userState = useRecoilValue(atomState.userState)

  const scrollRef = useRef([])
  const searchRef = useRef()
  const dropDownRef = useRef()

  const [numberPerPage, setNumberPerPage] = useState(20)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [search, setSearch] = useState({ status: false, data: [], text: '' })
  const [sort, setSort] = useState({ column: null, desc: false })
  const [filter, setFilter] = useState({
    available: false,
    notAvailable: false,
  })

  const [transactionData, setTransactionData] = useState([])

  const [date, setDate] = useState({ start: '', end: '' })
  const [keyword, setKeyword] = useState('')
  const [amount, setAmount] = useState({ start: '', end: '' })
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: null,
    amount: null,
    balance: null,
    status: null,
    action: null,
    page: activePage,
    numberPerPage,
  }

  const handleSelect = (option) => {
    setSelected(option)
    setOpen(!open)
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

  const getTransactionList = async () => {
    try {
      const { success, totalPages, totalRecords, result } = await request(
        '/product-transaction',
        queryParams,
        userState.accessToken,
        'get',
      )
      if (success) {
        const temp = []
        for (let i = 1; i <= totalPages; i = i + 1) {
          temp.push(i)
        }
        setTotalPage(temp)
        setTotalRecord(totalRecords)
        setTransactionData(result)
      }
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const onSearchInputChange = debounce(
    (text) => setSearch({ ...search, text }),
    300,
  )

  const onSearchBoxBlur = () =>
    setSearch((oldState) => ({
      ...oldState,
      status: false,
      data: [],
    }))

  const onSearchBoxFocus = () =>
    setSearch((oldState) => ({ ...oldState, status: true, data: [] }))

  const onClearSearchBox = () => {
    searchRef.current.value = ''
    setSearch({ ...search, text: '' })
    setRefreshFlag(!refreshFlag)
  }

  const onSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      setActivePage(1)
      setSearch({ ...search, status: false })
      setRefreshFlag(!refreshFlag)
    }
  }

  const onCheckBoxChange = (filterType) => {
    const filterOptions = { ...filter }
    filterOptions[filterType] = !filterOptions[filterType]
    setFilter(filterOptions)
    setActivePage(1)
  }

  // const toggle = () => setOpen(!open)
  // const setStart = (dateStart) => setDate({ start: dateStart, end: date.end })

  // const setEnd = (dateEnd) => setDate({ start: date.start, end: dateEnd })

  // const search = (event) => setKeyword(event.target.value)

  useEffect(() => {
    getTransactionList()
  }, [sort, keyword, selected, date, amount])

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    setActivePage(1)
  }

  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container>
      <div className='header'>
        <span>Transaction</span>
      </div>

      {/* <div className='header'>
        <FilterBlock>
          <div className='filter'>
            <div className='search'>
              <Input
                name='search'
                placeholder='Search ID, Name or Reporter'
                value={keyword}
                onChange={search}
              />
              {keyword && (
                <i className='clearIcon' onClick={() => setKeyword('')}>
                  <CrossIcon />
                </i>
              )}

              <div className='searchIcon'>
                <SearchIcon />
              </div>
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
                {amount.start && (
                  <div
                    className='amount-start'
                    onClick={() => setAmount({ start: '', end: amount.end })}>
                    <CrossIcon />
                  </div>
                )}
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
                {amount.end && (
                  <div
                    className='amount-end'
                    onClick={() => setAmount({ start: amount.start, end: '' })}>
                    <CrossIcon />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Datepicker date={date} setStart={setStart} setEnd={setEnd} />
            </div>
            <div />
          </div>
        </FilterBlock>
      </div> */}
      <div className='content'>
        {/* <TransactionTable data={[]} handleSort={handleSort} sort={sort} /> */}
        <div className='tools-bar-wrapper'>
          <div className='tools-bar'>
            <SearchBox
              ref={searchRef}
              onSearchInputChange={onSearchInputChange}
              onSubmitSearch={onSubmitSearch}
              onSearchBoxBlur={onSearchBoxBlur}
              onSearchBoxFocus={onSearchBoxFocus}
              onClearSearchBox={onClearSearchBox}
              text={search.text}
              data={search.data}
              status={search.status}
              field='username'
            />
          </div>
          <div className='tools-bar'>
            <div className='filter'>
              <div className='filter-button'>
                <FilterIcon width={30} />
                <div className='filter-options'>
                  <div className='options'>
                    <div className='options-name'>
                      <span>Status</span>
                    </div>
                    <div className='option-actions'>
                      <div className='checkbox'>
                        <label className='custom-checkbox'>
                          <input
                            type='checkbox'
                            checked={filter.available}
                            onChange={() => onCheckBoxChange('available')}
                          />
                          <span className='box' />
                        </label>
                        <span className='title'>Available</span>
                      </div>
                      <div className='checkbox'>
                        <label className='custom-checkbox'>
                          <input
                            type='checkbox'
                            checked={filter.notAvailable}
                            onChange={() => onCheckBoxChange('notAvailable')}
                          />
                          <span className='box' />
                        </label>
                        <span className='title'>Not Available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='item-per-page-placeholder'>
              <span>Shows: </span>
            </div>
            <DropDown
              ref={dropDownRef}
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
            />
            <div
              className='create-new-button'
              onClick={() => history.push('/user-management/create')}>
              Create
            </div>
          </div>
        </div>
        {transactionData.length &&
          transactionData.map((value, index) => {
            return (
              <>
                <label className='transaction-list'>
                  <div>
                    {value.reference_number}, {value.action_name},{' '}
                    {value.created_at}, {value.detail}, {value.status_value},{' '}
                    {value.username}
                  </div>
                  <input type='checkbox' />
                  <div className='expand'>
                    {transactionData[index].data.map((subValue, subIndex) => {
                      return <li>{subValue.product_id}</li>
                    })}
                  </div>
                </label>
              </>
            )
          })}
      </div>
    </Container>
  )
}

export default Transaction
