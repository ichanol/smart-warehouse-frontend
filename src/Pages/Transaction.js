import {
  DateRangeButton,
  DropDown,
  FilterTrasaction,
  NumberIndicator,
  Pagination,
  TransactionTable,
  SearchBox as useSearchBox,
} from '../components'
import React, { useEffect, useState } from 'react'
import { requestHandler, useAxios } from '../Services'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { Container } from '../Pages/TransactionStyle'
import { atomState } from '../Atoms'
import { blobFileDownloader } from '../Utils'
import { debounce } from 'lodash'
import { useHistory } from 'react-router-dom'

const Transaction = () => {
  const today = new Date()
  const itemPerPageList = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 50 },
    { name: 100 },
  ]

  const history = useHistory()

  const setToastState = useSetRecoilState(atomState.toastState)
  const [transactionData, setTransactionData] = useRecoilState(
    atomState.transactionListState,
  )

  const [minMaxBalance, setMinMaxBalance] = useState({ min: 0, max: 1000000 })
  const [minMaxAmount, setMinMaxAmount] = useState({ min: 0, max: 1000000 })
  const [numberPerPage, setNumberPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [totalRecord, setTotalRecord] = useState(null)
  const [sort, setSort] = useState({ column: null, desc: true })
  const [filter, setFilter] = useState({
    status: {
      available: true,
      notAvailable: true,
    },
    action: {
      import: true,
      export: true,
      damaged: true,
      expired: true,
    },
  })
  const [searchSuggest, setSearchSuggest] = useState([])
  const [date, setDate] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    key: 'selection',
  })

  const oneDayMillis = 24 * 60 * 60 * 1000
  const startDate = new Date(date.startDate.getTime() - oneDayMillis)
  const endDate = new Date(date.endDate.getTime() + oneDayMillis)

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

  const [
    searchText,
    searchTrigger,
    trigger,
    setTrigger,
    SearchBoxComponent,
  ] = useSearchBox(searchSuggest, 'reference_number')

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: searchText === '' ? null : searchText,
    amount: `${minMaxAmount.min},${minMaxAmount.max}`,
    balance: `${minMaxBalance.min},${minMaxBalance.max}`,
    status: statusFilterHandler(),
    action: actionFilterHandler(),
    page: activePage,
    numberPerPage,
    date:
      date.startDate && date.endDate
        ? `${startDate.getFullYear()}-${startDate.getMonth() +
            1}-${startDate.getDate()},${endDate.getFullYear()}-${endDate.getMonth() +
            1}-${endDate.getDate()}`
        : null,
  }

  const searchQueryParams = { ...queryParams }
  searchQueryParams.page = 1

  const [
    transactionListData,
    transactionListDataTrigger,
    setTransactionListDataTrigger,
    setFetchTransactionListData,
  ] = useAxios('/product-transaction', true, queryParams, 'get')

  const [
    searchTransactionListData,
    searchTransactionListDataTrigger,
    setSearchTransactionListDataTrigger,
    setFetchSearchTransactionListData,
  ] = useAxios('/product-transaction', true, searchQueryParams, 'get')

  useEffect(() => {
    setFetchTransactionListData(true)
    const { result, totalPages, totalRecords } = transactionListData
    setTransactionData(result)
    setTotalRecord(totalRecords)
    if (totalPages) {
      setTotalPage(new Array(totalPages).fill(1))
    } else {
      setTotalPage([])
    }
  }, [transactionListData])

  useEffect(() => {
    setTransactionListDataTrigger(!transactionListDataTrigger)
  }, [
    sort,
    numberPerPage,
    activePage,
    filter,
    minMaxBalance,
    minMaxAmount,
    searchTrigger,
    date,
  ])

  useEffect(() => {
    if (searchText !== '') {
      setFetchSearchTransactionListData(true)
      setSearchTransactionListDataTrigger(!searchTransactionListDataTrigger)
    }
  }, [searchText])

  useEffect(() => {
    setSearchSuggest(searchTransactionListData.result)
    setTrigger(!trigger)
  }, [searchTransactionListData])

  const onChangeNumberPerPage = (index) => {
    setNumberPerPage(itemPerPageList[index].name)
    setActivePage(1)
  }

  const onCheckBoxChange = (filterGroup, filterType) => {
    const filterOptions = { ...filter }
    filterOptions[filterGroup][filterType] = !filterOptions[filterGroup][
      filterType
    ]
    setFilter(filterOptions)
    setActivePage(1)
  }

  const onSortByColumn = (columnType) =>
    setSort({ column: columnType, desc: !sort.desc })

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  const setMinBalance = debounce(
    (value) => setMinMaxBalance({ ...minMaxBalance, min: value }),
    300,
  )
  const setMaxBalance = debounce(
    (value) => setMinMaxBalance({ ...minMaxBalance, max: value }),
    300,
  )
  const setMinMaxBalanceOnSlider = debounce(
    (min, max) => setMinMaxBalance({ ...minMaxBalance, max, min }),
    300,
  )

  const setMinAmount = debounce((value) => {
    console.log(value)
    setMinMaxAmount({ ...minMaxAmount, min: value })
  }, 300)
  const setMaxAmount = debounce(
    (value) => setMinMaxAmount({ ...minMaxAmount, max: value }),
    300,
  )
  const setMinMaxAmountOnSlider = debounce(
    (min, max) => setMinMaxAmount({ ...minMaxAmount, max, min }),
    300,
  )

  const onEdit = (transactionReference) => {
    history.push(`/transaction/edit-transaction/${transactionReference}`)
  }

  const onGenerateReport = async (reportNumber) => {
    const response = await requestHandler(
      `/generate-pdf/${reportNumber}`,
      true,
      null,
      'get',
      0,
      0,
      true,
    )
    blobFileDownloader(response, `${reportNumber}.pdf`)
  }

  return (
    <Container>
      <div className='header'>
        <span>Transaction</span>
      </div>
      <div className='content'>
        <div className='tools-bar-wrapper'>
          <div className='tools-bar'>{SearchBoxComponent}</div>
          <div className='tools-bar'>
            <div className='filter-wrapper'>
              <FilterTrasaction
                filter={filter}
                onCheckBoxChange={onCheckBoxChange}
                setMaxAmount={setMaxAmount}
                setMinAmount={setMinAmount}
                setMinMaxAmountOnSlider={setMinMaxAmountOnSlider}
                setMaxBalance={setMaxBalance}
                setMinBalance={setMinBalance}
                setMinMaxBalanceOnSlider={setMinMaxBalanceOnSlider}
              />
            </div>
            <div className='filter-wrapper'>
              <DateRangeButton setDate={setDate} date={date} />
            </div>
            <DropDown
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
              fullWidth={false}
            />
          </div>
        </div>
        <TransactionTable
          tableHeight={540}
          data={transactionData}
          onSortByColumn={onSortByColumn}
          sort={sort}
          onEdit={onEdit}
          onGenerateReport={onGenerateReport}
        />

        <div className='number-indicator-wrapper'>
          <NumberIndicator
            numberPerPage={numberPerPage}
            activePage={activePage}
            totalRecord={totalRecord}
            numberOfShown={transactionData?.length}
          />
        </div>
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
