import {
  ArrowIcon,
  ChevronDownIcon,
  DocumentIcon,
  DotsMenu,
  EditIcon,
} from '../Icon'
import {
  ArrowWrapper,
  Table,
  TransactionList,
  TransactionTitle,
} from './TransactionTableStyle'
import React, { useRef, useState } from 'react'

import { COLORS } from '../../Constant'
import { capitalize } from 'lodash'
import clsx from 'clsx'
import moment from 'moment'
import { useEffect } from 'react'

const TransactionTable = ({
  tableHeight,
  data,
  onSortByColumn,
  sort,
  onEdit,
  onGenerateReport,
}) => {
  const tableRef = useRef()

  const [dataArray, setDataArray] = useState([])
  const [arrowState, setArrowState] = useState({
    display: false,
    rotate: false,
    scrollHeight: 0,
  })

  const onScrollTable = (event) => {
    const newArrowState = {
      ...arrowState,
    }

    if (event.currentTarget.scrollHeight > tableHeight) {
      newArrowState.display = true
    } else {
      newArrowState.display = false
    }
    if (
      event.currentTarget.scrollTop <=
        event.currentTarget.scrollHeight - tableHeight &&
      event.currentTarget.scrollTop >
        event.currentTarget.scrollHeight - tableHeight - 25
    ) {
      newArrowState.rotate = true
    } else {
      newArrowState.rotate = false
    }
    setArrowState(newArrowState)
  }

  const onClickMenu = (event, index) => {
    event.preventDefault()
    event.stopPropagation()

    const cloneData = [...dataArray]
    cloneData[index] = {
      ...cloneData[index],
      isOpen: !cloneData[index].isOpen,
    }

    setDataArray(cloneData)
  }

  useEffect(() => {
    const newData = []
    for (let i = 0; i < data?.length; i = i + 1) {
      const value = { ...data[i] }
      value.isOpen = false
      newData.push(value)
    }
    setDataArray(newData)
    const resizeObserver = new window.ResizeObserver((entries) => {
      const newArrowState = {
        ...arrowState,
        display: true,
        scrollHeight: entries[0].target.scrollHeight > tableHeight,
      }
      setArrowState(newArrowState)
    })

    resizeObserver.observe(tableRef.current)
  }, [data])

  const onClickArrow = () => {
    if (arrowState.rotate) {
      tableRef.current.scrollTop = 0
    } else {
      tableRef.current.scrollTop = tableRef.current.scrollHeight
    }
  }

  return (
    <ArrowWrapper
      tableHeight={tableHeight}
      display={arrowState.display ? 1 : 0}
      scrollHeight={arrowState.scrollHeight}
      rotate={arrowState.rotate ? 1 : 0}>
      <div className='arrow-wrapper' onClick={onClickArrow}>
        <ArrowIcon />
      </div>
      <Table height={tableHeight} onScroll={onScrollTable} ref={tableRef}>
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

        {dataArray?.length > 0 &&
          dataArray.map((value, index) => {
            return (
              <TransactionRecord
                value={value}
                index={index}
                key={index}
                onClickMenu={onClickMenu}
                onEdit={onEdit}
                onGenerateReport={onGenerateReport}
              />
            )
          })}
      </Table>
    </ArrowWrapper>
  )
}

const TransactionRecord = ({
  value,
  index,
  onClickMenu,
  onEdit,
  onGenerateReport,
}) => {
  const [dismissContext, setDismissContext] = useState(false)

  const onToggleMenu = (event, subIndex) => {
    onClickMenu(event, subIndex)
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
        {value.data.map((subValue, subIndex) => {
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
                <span className='product-information'>{subValue.balance.toLocaleString()}</span>
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

export default TransactionTable
