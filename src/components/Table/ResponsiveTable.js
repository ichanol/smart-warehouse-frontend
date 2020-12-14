import { ChevronDownIcon, DeleteIcon, EditIcon } from '../Icon'
import React, { useRef, useState } from 'react'
import { SortArrow, Table, Wrapper } from './ResponsiveTableStyle'

import { ToggleButton } from '../Button'
import clsx from 'clsx'
import moment from 'moment'
import propTypes from 'prop-types'

const ResponsiveTable = ({
  title,
  data = [],
  onSortByColumn,
  sort,
  onToggleSwitch,
  fixedDataColumn,
  scrollDataColumn,
  actionColumn,
  onEdit,
  centerColumn,
  toggleButton,
  deleteButton,
  editButton,
  onDelete,
  indexCounter,
}) => {
  const tableRef = useRef()
  const [isScroll, setIsScroll] = useState(false)
  const renderFixedDataColumn = (dataToRender, primaryIndex) => {
    return (
      <div className='table-data-wrapper' key={primaryIndex}>
        {indexCounter && (
          <div
            className={clsx(
              'cell data primarykey',
              primaryIndex % 2 && 'odd',
              !dataToRender.status && 'inactive',
            )}>
            <span>{primaryIndex + 1}</span>
          </div>
        )}
        {fixedDataColumn.map((value, index) => (
          <div
            key={index}
            className={clsx(
              'cell data',
              primaryIndex % 2 && 'odd',
              !dataToRender.status && 'inactive',
            )}>
            <span>{dataToRender[value]}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderScrollDataColumn = (dataToRender, primaryIndex) => {
    return (
      <div className='table-data-wrapper' key={primaryIndex}>
        {scrollDataColumn.map((value, index) => {
          const isCenter = centerColumn.filter(
            (centerField) => value === centerField,
          )
          const isDateType = value.split('_')
          if (isDateType[1] === 'at') {
            return (
              <div
                key={index}
                className={clsx(
                  'cell data time',
                  primaryIndex % 2 && 'odd',
                  !dataToRender.status && 'inactive',
                )}>
                <span>
                  {moment.utc(dataToRender[value]).format('L')}{' '}
                  {moment.utc(dataToRender[value]).format('LTS')}
                </span>
              </div>
            )
          } else if (isCenter.length) {
            return (
              <div
                key={index}
                className={clsx(
                  'cell data center',
                  primaryIndex % 2 && 'odd',
                  !dataToRender.status && 'inactive',
                )}>
                <span>{dataToRender[value]?.toLocaleString()}</span>
              </div>
            )
          } else if (actionColumn === value) {
            return (
              <div
                key={index}
                className={clsx(
                  'cell data action',
                  primaryIndex % 2 && 'odd',
                  !dataToRender.status && 'inactive',
                )}>
                {toggleButton && (
                  <ToggleButton
                    value={dataToRender.status}
                    action={() => onToggleSwitch(primaryIndex)}
                  />
                )}
                {editButton && (
                  <div
                    className='edit-wrapper'
                    onClick={() => {
                      onEdit(primaryIndex)
                    }}>
                    <EditIcon />
                  </div>
                )}
                {deleteButton && (
                  <div
                    className='delete-wrapper'
                    onClick={() => onDelete(dataToRender)}>
                    <DeleteIcon />
                  </div>
                )}
              </div>
            )
          } else {
            return (
              <div
                key={index}
                className={clsx(
                  'cell data',
                  primaryIndex % 2 && 'odd',
                  !dataToRender.status && 'inactive',
                  !dataToRender[value] && 'center',
                )}>
                <span>
                  {dataToRender[value]
                    ? dataToRender[value]?.toLocaleString()
                    : '-'}
                </span>
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <Wrapper>
      {data?.length === 0 && (
        <div className='no-data'>
          <span className='no-data-title'>no data</span>
        </div>
      )}
      <Table
        ref={tableRef}
        open={false}
        isScroll={isScroll}
        onScroll={() => setIsScroll(tableRef?.current?.scrollLeft > 0)}>
        <div className='table'>
          <div className='fixed-section'>
            <div className='fixed-headers'>
              {indexCounter && (
                <div className='cell title primarykey'>
                  <span>No.</span>
                </div>
              )}
              {title.map((value, index) => {
                if (index < fixedDataColumn.length) {
                  return (
                    <div
                      key={index}
                      className='cell title'
                      onClick={() => onSortByColumn(value.type)}>
                      <span>{value.title}</span>
                      {value.isSort && (
                        <SortArrow isActive={sort.desc}>
                          <ChevronDownIcon
                            isActive={sort.desc}
                            activeType={sort.column}
                            type={value.type}
                          />
                        </SortArrow>
                      )}
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
            <div className='fixed-data' />
            {data?.map((value, index) => renderFixedDataColumn(value, index))}
          </div>

          <div className='scroll-section'>
            <div className='scroll-headers'>
              {title.map((value, index) => {
                if (index >= fixedDataColumn.length) {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        'cell',
                        'title',
                        value.title === 'Actions' && 'action',
                      )}
                      onClick={() => onSortByColumn(value.type)}>
                      <span>{value.title}</span>
                      {value.isSort && (
                        <SortArrow isActive={sort.desc}>
                          <ChevronDownIcon
                            isActive={sort.desc}
                            activeType={sort.column}
                            type={value.type}
                          />
                        </SortArrow>
                      )}
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
            <div className='scroll-data' />
            {data?.map((value, index) => renderScrollDataColumn(value, index))}
          </div>
        </div>
      </Table>
    </Wrapper>
  )
}

ResponsiveTable.propTypes = {
  title: propTypes.array,
  data: propTypes.array,
  onSortByColumn: propTypes.func,
  sort: propTypes.object,
  onToggleSwitch: propTypes.func,
  onDelete: propTypes.func,
  fixedDataColumn: propTypes.array,
  scrollDataColumn: propTypes.array,
  actionColumn: propTypes.string,
  onEdit: propTypes.func,
  centerColumn: propTypes.array,
  toggleButton: propTypes.bool,
  deleteButton: propTypes.bool,
  editButton: propTypes.bool,
  indexCounter: propTypes.bool,
  darkHeader: propTypes.bool,
}
ResponsiveTable.defaultProps = {
  title: [
    { title: 'Column1', type: 'columnType1' },
    { title: 'Column2', type: 'columnType2' },
    { title: 'Column3', type: 'columnType3' },
    { title: 'Column4', type: 'columnType4' },
    { title: 'Column5', type: 'columnType5' },
    { title: 'Column6', type: 'columnType6' },
    { title: 'Column7', type: 'columnType7' },
    { title: 'Column8', type: 'columnType8' },
  ],
  data: [],
  onSortByColumn: () => {},
  sort: {
    status: false,
    option: { type: null, desc: false },
  },
  onToggleSwitch: () => {},
  onDelete: () => {},
  fixedDataColumn: [],
  scrollDataColumn: [],
  actionColumn: '',
  onEdit: () => {},
  centerColumn: [],
  toggleButton: true,
  deleteButton: true,
  editButton: true,
  indexCounter: false,
  darkHeader: false,
}
export default ResponsiveTable
