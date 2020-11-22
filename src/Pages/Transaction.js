import {
  ChevronDownIcon,
  DropDown,
  FilterIcon,
  Pagination,
  SearchBox,
  Slider,
} from '../components'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { Container } from '../Pages/TransactionStyle'
import { Datepicker } from '../components/Datepicker' //
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

  const [minMax, setMinMax] = useState({ min: 0, max: 0 })
  const [minMaxBalance, setMinMaxBalance] = useState({ min: 0, max: 1000000 })
  const [minMaxAmount, setMinMaxAmount] = useState({ min: 0, max: 1000000 })
  const [numberPerPage, setNumberPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [search, setSearch] = useState({ status: false, data: [], text: '' })
  const [sort, setSort] = useState({ column: null, desc: true })
  const [filter, setFilter] = useState({
    status: {
      available: false,
      notAvailable: false,
    },
    action: {
      import: false,
      export: false,
      damaged: false,
      expired: false,
    },
  })

  const [transactionData, setTransactionData] = useState([])

  const [date, setDate] = useState({ start: '', end: '' })

  const statusFilterHandler = () => {
    if (
      (filter.status.available && filter.status.notAvailable) ||
      (!filter.status.available && !filter.status.notAvailable)
    ) {
      return null
    } else if (filter.status.available) {
      return '1'
    } else if (filter.status.notAvailable) {
      return '0'
    } else {
      return null
    }
  }

  const actionFilterHandler = () => {
    if (
      (filter.action.import &&
        filter.action.export &&
        filter.action.expired &&
        filter.action.damaged) ||
      (!filter.action.import &&
        !filter.action.export &&
        !filter.action.expired &&
        !filter.action.damaged)
    ) {
      return null
    } else {
      let action = ''
      for (const [key, value] of Object.entries(filter.action)) {
        if (value) {
          action = action + `"${key}",`
        }
      }
      return action
    }
  }

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: search.text,
    amount: `${minMaxAmount.min},${minMaxAmount.max}`,
    balance: `${minMaxBalance.min},${minMaxBalance.max}`,
    status: statusFilterHandler(),
    action: actionFilterHandler(),
    page: activePage,
    numberPerPage,
  }

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

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

  const searchTransactionList = async () => {
    try {
      if (search.text === '') {
        setSearch({ ...search, data: [] })
      } else {
        const { result } = await request(
          '/product-transaction',
          queryParams,
          userState.accessToken,
          'get',
        )
        console.log(result)

        if (result && result.length > 0) {
          setSearch((oldState) => ({ ...oldState, status: true, data: result }))
        } else {
          setSearch((oldState) => ({ ...oldState, status: false, data: [] }))
        }
      }
    } catch (error) {
      setSearch((oldState) => ({ ...oldState, status: false, data: [] }))
      console.log(error)
    }
  }

  const onCheckBoxChange = (filterGroup, filterType) => {
    const filterOptions = { ...filter }
    filterOptions[filterGroup][filterType] = !filterOptions[filterGroup][
      filterType
    ]
    setFilter(filterOptions)
    setActivePage(1)
  }

  const setStart = (dateStart) => setDate({ start: dateStart, end: date.end })
  const setEnd = (dateEnd) => setDate({ start: date.start, end: dateEnd })

  useEffect(() => {
    getTransactionList()
  }, [activePage, numberPerPage, refreshFlag, sort, filter, minMaxBalance, minMaxAmount])

  useEffect(() => {
    searchTransactionList()
  }, [search.text])

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    setActivePage(1)
  }

  const setMinBalance = debounce(
    (value) => setMinMaxBalance({ ...minMax, min: value }),
    300,
  )
  const setMaxBalance = debounce(
    (value) => setMinMaxBalance({ ...minMax, max: value }),
    300,
  )

  const setMinAmount = debounce(
    (value) => setMinMaxAmount({ ...minMax, min: value }),
    300,
  )
  const setMaxAmount = debounce(
    (value) => setMinMaxAmount({ ...minMax, max: value }),
    300,
  )

  const itemPerPageList = [10, 20, 30, 50, 100]

  return (
    <Container>
      <div className='header'>
        <span>Transaction</span>
      </div>
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
              field='reference_number'
            />
          </div>
          <div className='tools-bar'>
            <div className='filter'>
              <div className='filter-button'>
                <FilterIcon width={30} />
                {/* ============================================= */}
                <div className='filter-options'>
                  <div className='options-row'>
                    <div className='options'>
                      <div className='options-name'>
                        <span>Status</span>
                      </div>
                      <div className='option-actions'>
                        <div className='checkbox'>
                          <label className='custom-checkbox'>
                            <input
                              type='checkbox'
                              checked={filter.status.available}
                              onChange={() =>
                                onCheckBoxChange('status', 'available')
                              }
                            />
                            <span className='box' />
                          </label>
                          <span className='title'>Available</span>
                        </div>
                        <div className='checkbox'>
                          <label className='custom-checkbox'>
                            <input
                              type='checkbox'
                              checked={filter.status.notAvailable}
                              onChange={() =>
                                onCheckBoxChange('status', 'notAvailable')
                              }
                            />
                            <span className='box' />
                          </label>
                          <span className='title'>Not Available</span>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div className='options'>
                      <div className='options-name'>
                        <span>Action</span>
                      </div>
                      <div className='option-actions-row'>
                        <div className='checkbox'>
                          <label className='custom-checkbox'>
                            <input
                              type='checkbox'
                              checked={filter.action.import}
                              onChange={() =>
                                onCheckBoxChange('action', 'import')
                              }
                            />
                            <span className='box' />
                          </label>
                          <span className='title'>Import</span>
                        </div>
                        <div className='checkbox'>
                          <label className='custom-checkbox'>
                            <input
                              type='checkbox'
                              checked={filter.action.export}
                              onChange={() =>
                                onCheckBoxChange('action', 'export')
                              }
                            />
                            <span className='box' />
                          </label>
                          <span className='title'>Export</span>
                        </div>
                        <div className='checkbox'>
                          <label className='custom-checkbox'>
                            <input
                              type='checkbox'
                              checked={filter.action.expired}
                              onChange={() =>
                                onCheckBoxChange('action', 'expired')
                              }
                            />
                            <span className='box' />
                          </label>
                          <span className='title'>Expired</span>
                        </div>
                        <div className='checkbox'>
                          <label className='custom-checkbox'>
                            <input
                              type='checkbox'
                              checked={filter.action.damaged}
                              onChange={() =>
                                onCheckBoxChange('action', 'damaged')
                              }
                            />
                            <span className='box' />
                          </label>
                          <span className='title'>Damaged</span>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                  <div className='options-row'>
                    <div className='range-slider'>
                      <div className='options-name'>
                        <span>Amount</span>
                      </div>
                      <div className='slider-wrapper'>
                        <Slider
                          setMax={setMaxAmount}
                          setMin={setMinAmount}
                          width={220}
                          color='red'
                        />
                      </div>
                    </div>
                    <div className='range-slider'>
                      <div className='options-name'>
                        <span>Balance</span>
                      </div>
                      <div className='slider-wrapper'>
                        <Slider
                          setMax={setMaxBalance}
                          setMin={setMinBalance}
                          width={220}
                          color='blue'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='date-picker-wrapper'>
                    <Datepicker
                      date={date}
                      setStart={setStart}
                      setEnd={setEnd}
                    />
                  </div>
                </div>
                {/* ============================================= */}
              </div>
            </div>
            <DropDown
              ref={dropDownRef}
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
              fullWidth={false}
              placeholder
            />
          </div>
        </div>
        <div className='transaction-information-title'>
          <div
            className='transaction-title transaction-reference-number'
            onClick={() => onSortByColumn('reference_number')}>
            <span>Ref</span>
            <div className='chevron-wrapper'>
              <ChevronDownIcon
                isActive={sort.desc}
                activeType={sort.column}
                type={'reference_number'}
              />
            </div>
          </div>
          <div
            className='transaction-title transaction-timestamp'
            onClick={() => onSortByColumn('created_at')}>
            <span>Date</span>
            <div className='chevron-wrapper'>
              <ChevronDownIcon
                isActive={sort.desc}
                activeType={sort.column}
                type={'created_at'}
              />
            </div>
          </div>
          <div className='transaction-title transaction-type'>
            <span>Action</span>
          </div>
          <div className='transaction-title transaction-remark'>
            <span>Detail</span>
          </div>
          <div
            className='transaction-title transaction-author'
            onClick={() => onSortByColumn('username')}>
            <span>Responsable</span>
            <div className='chevron-wrapper'>
              <ChevronDownIcon
                isActive={sort.desc}
                activeType={sort.column}
                type={'username'}
              />
            </div>
          </div>
        </div>
        <input type='checkbox' />

        {transactionData.length > 0 &&
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
      <Pagination
        totalPage={totalPage}
        activePage={activePage}
        onChangePage={onClickPageNumber}
      />
    </Container>
  )
}

export default Transaction
