import {
  ChevronDownIcon,
  DateRangeButton,
  DocumentIcon,
  DotsMenu,
  DropDown,
  EditIcon,
  FilterTrasaction,
  NumberIndicator,
  Pagination,
  SearchBox as useSearchBox,
} from '../components'
import {
  Container,
  Table,
  TransactionList,
  TransactionTitle,
} from '../Pages/TransactionStyle'
import React, { useEffect, useState } from 'react'
import { capitalize, debounce } from 'lodash'
import { requestHandler, useAxios } from '../Services'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { COLORS } from '../Constant'
import { atomState } from '../Atoms'
import { blobFileDownloader } from '../Utils'
import clsx from 'clsx'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const Transaction = () => {
  const today = new Date()

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
    const newTransaction = result?.map((value, index) => {
      value.isOpen = false
      return value
    })
    setTransactionData(newTransaction)
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

  const onChangeNumberPerPage = (number) => {
    setNumberPerPage(number)
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

  const itemPerPageList = [10, 20, 30, 50, 100]

  const onClickTransactionMenu = (event, index) => {
    event.preventDefault()
    event.stopPropagation()

    const cloneTransactionData = [...transactionData]
    cloneTransactionData[index] = {
      ...cloneTransactionData[index],
      isOpen: !cloneTransactionData[index].isOpen,
    }

    setTransactionData(cloneTransactionData)
  }

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
                // date={date}
                // setEnd={setEnd}
                // setStart={setStart}
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
              placeholder
            />
          </div>
        </div>

        <Table>
          <TransactionTitle>
            <div
              className='transaction-title transaction-reference-number'
              onClick={() => onSortByColumn('reference_number')}>
              <span>
                Ref{' '}
                <div className='chevron-wrapper'>
                  <ChevronDownIcon
                    isActive={sort.desc}
                    activeType={sort.column}
                    type={'reference_number'}
                  />
                </div>
              </span>
            </div>
            <div
              className='transaction-title transaction-timestamp'
              onClick={() => onSortByColumn('created_at')}>
              <span>
                Date
                <div className='chevron-wrapper'>
                  <ChevronDownIcon
                    isActive={sort.desc}
                    activeType={sort.column}
                    type={'created_at'}
                  />
                </div>
              </span>
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
              <span>
                Responsable
                <div className='chevron-wrapper'>
                  <ChevronDownIcon
                    isActive={sort.desc}
                    activeType={sort.column}
                    type={'username'}
                  />
                </div>
              </span>
            </div>
            <div className='transaction-title transaction-menu' />
          </TransactionTitle>

          {transactionData?.length > 0 &&
            transactionData.map((value, index) => {
              return (
                <TransactionRecord
                  value={value}
                  index={index}
                  onClickTransactionMenu={onClickTransactionMenu}
                  transactionData={transactionData}
                  key={index}
                  onEdit={onEdit}
                  onGenerateReport={onGenerateReport}
                />
              )
            })}
        </Table>
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

const TransactionRecord = ({
  value,
  index,
  onClickTransactionMenu,
  transactionData,
  onEdit,
  onGenerateReport,
}) => {
  const [dismissContext, setDismissContext] = useState(false)

  const onToggleMenu = (event, subIndex) => {
    onClickTransactionMenu(event, subIndex)
    setDismissContext(!dismissContext)
  }

  return (
    <TransactionList key={index} isOpen={value.isOpen}>
      <input type='checkbox' />
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
        <div
          className='transaction-detail transaction-menu'
          htmlFor='context-menu'
          onClick={(event) => onToggleMenu(event, index)}>
          <DotsMenu />
          <div className='transaction-context-menu'>
            <div
              className='transaction-record-menu'
              onClick={() => onEdit(value.reference_number)}>
              <EditIcon fill={COLORS.gray[600]} />
              <span className='transaction-record-menu-title'>
                Edit Transaction
              </span>
            </div>
            <div
              className='transaction-record-menu'
              onClick={() => onGenerateReport(value.reference_number)}>
              <DocumentIcon fill={COLORS.gray[600]} />
              <span className='transaction-record-menu-title'>
                Generate Report
              </span>
            </div>
          </div>
        </div>
        <div
          className='dismiss-context'
          onClick={(event) => onToggleMenu(event, index)}
        />
      </div>
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
                <span className='product-information'>{subIndex + 1}</span>
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
                  {value.action_type.toLowerCase() === 'add' ? '+' : '-'}{' '}
                  {subValue.amount.toLocaleString()}
                </span>
              </div>
              <div className='product-detail product-balance'>
                <span className='product-information'>{subValue.balance}</span>
              </div>
              <div className='product-detail product-location'>
                <span className='product-information'>{subValue.location}</span>
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
    </TransactionList>
  )
}
