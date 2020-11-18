import { DropDown, FilterIcon, Pagination, SearchBox, Slider } from '../components'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Container } from '../Pages/TransactionStyle'
import { Datepicker } from '../components/Datepicker' //
import { TransactionTable } from '../components' //
import { atomState } from '../Atoms'
import { capitalize } from 'lodash'
import clsx from 'clsx'
import { debounce } from 'lodash'
import moment from 'moment'
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

  // const setStart = (dateStart) => setDate({ start: dateStart, end: date.end })
  // const setEnd = (dateEnd) => setDate({ start: date.start, end: dateEnd })

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

      {/* <Datepicker date={date} setStart={setStart} setEnd={setEnd} /> */}
      {/* <TransactionTable data={[]} handleSort={handleSort} sort={sort} /> */}
      <div className='content'>
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
              <label className='transaction-list' key={index}>
                <div
                  className={clsx(
                    'transaction-information',
                    value.action_name.toLowerCase(),
                  )}>
                  <div className='transaction-detail transaction-reference-number'>
                    <span>{value.reference_number}</span>
                  </div>
                  <div className='transaction-detail transaction-timestamp'>
                    <span>{moment.utc(value.created_at).format('lll')}</span>
                  </div>
                  <div className='transaction-detail transaction-type'>
                    <span>{capitalize(value.action_name)}</span>
                  </div>
                  <div className='transaction-detail transaction-remark'>
                    <span>{value.detail}</span>
                  </div>
                  <div className='transaction-detail transaction-author'>
                    <span>{value.username}</span>
                  </div>
                </div>
                <input type='checkbox' />
                <div className='transaction-product-list-container'>
                  <div className='product-list product-list-title'>
                    <div className='product-detail index' />
                    <div className='product-detail product-id'>
                      <span className='product-information'>Serial Number</span>
                    </div>
                    <div className='product-detail product-name'>
                      <span className='product-information'>Name</span>
                    </div>
                    <div className='product-detail product-amount'>
                      <span className='product-information'>Amount</span>
                    </div>
                    <div className='product-detail product-balance'>
                      <span className='product-information'>Balance</span>
                    </div>
                    <div className='product-detail product-location'>
                      <span className='product-information'>Location</span>
                    </div>
                    <div className='product-detail product-remark'>
                      <span className='product-information'>Remark</span>
                    </div>
                  </div>
                  {transactionData[index].data.map((subValue, subIndex) => {
                    return (
                      <div className='product-list' key={subIndex}>
                        <div className='product-detail index'>
                          <span className='product-information'>
                            {subIndex + 1}
                          </span>
                        </div>
                        <div className='product-detail product-id'>
                          <span className='product-information'>
                            {subValue.product_id}
                          </span>
                        </div>
                        <div className='product-detail product-name'>
                          <span className='product-information'>
                            {subValue.product_name}
                          </span>
                        </div>
                        <div className='product-detail product-amount'>
                          <span
                            className={clsx(
                              'product-information amount-tag',
                              value.action_type.toLowerCase(),
                            )}>
                            {value.action_type.toLowerCase() === 'add'
                              ? '+'
                              : '-'}{' '}
                            {subValue.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className='product-detail product-balance'>
                          <span className='product-information'>
                            {subValue.balance}
                          </span>
                        </div>
                        <div className='product-detail product-location'>
                          <span className='product-information'>
                            {subValue.location}
                          </span>
                        </div>
                        <div className='product-detail product-remark'>
                          <span className='product-information'>
                            {subValue.product_detail}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </label>
            )
          })}
      </div>
      <Slider/>
    </Container>
  )
}

export default Transaction
