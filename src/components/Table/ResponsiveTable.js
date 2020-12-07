import {
  Container,
  DataSection,
  SortArrow,
  TitleSection,
} from './ResponsiveTableStyle'
import { DeleteIcon, EditIcon } from '../Icon'
import React, { useRef, useState } from 'react'

import { ChevronDownIcon } from '../Icon'
import { ToggleButton } from '../Button'
import clsx from 'clsx'
import moment from 'moment'
import propTypes from 'prop-types'

const ResponsiveTable = ({
  title,
  data,
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
  darkHeader,
}) => {
  const [scrollState, setScrollState] = useState('data')
  const scrollRef = useRef([])

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
                <span>{dataToRender[value]}</span>
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
                  <div onClick={() => onDelete(dataToRender)}>
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
                )}>
                <span>{dataToRender[value]}</span>
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <Container>
      {/* <div
        className='arrow left'
        onClick={() => {
          scrollRef.current[0].scrollLeft = scrollRef.current[0].scrollLeft - 100
          scrollRef.current[1].scrollLeft = scrollRef.current[0].scrollLeft - 100
          console.log(scrollRef.current)
        }}
      />
      <div
        className='arrow right'
        onClick={() => {
          scrollRef.current[0].scrollLeft = scrollRef.current[0].scrollLeft + 100
          scrollRef.current[1].scrollLeft = scrollRef.current[0].scrollLeft + 100
        }}
      /> */}
      <TitleSection
        multiplier={fixedDataColumn.length}
        isShowIndex={indexCounter}
        darkHeader={darkHeader}>
        <div className='fixed-section'>
          <div className='table-title-wrapper'>
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
        </div>
        <div
          className='scroll-section'
          ref={(ref) => (scrollRef.current[0] = ref)}
          onScroll={({ target }) => {
            if (scrollState === 'title') {
              scrollRef.current[1].scrollLeft = target.scrollLeft
            }
          }}
          onMouseEnter={() => setScrollState('title')}
          onTouchStart={() => setScrollState('title')}>
          <div className='table-title-wrapper'>
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
        </div>
      </TitleSection>
      <DataSection
        multiplier={fixedDataColumn.length}
        isShowIndex={indexCounter}
        darkHeader={darkHeader}>
        {data?.length === 0 && (
          <div className='no-data'>
            <span className='no-data-title'>no data</span>
          </div>
        )}
        <div className='fixed-section'>
          {data?.map((value, index) => renderFixedDataColumn(value, index))}
        </div>
        <div
          className='scroll-section'
          ref={(ref) => (scrollRef.current[1] = ref)}
          onMouseEnter={() => setScrollState('data')}
          onTouchStart={() => setScrollState('data')}
          onScroll={({ target }) => {
            if (scrollState === 'data') {
              scrollRef.current[0].scrollLeft = target.scrollLeft
            }
          }}>
          {data?.map((value, index) => renderScrollDataColumn(value, index))}
        </div>
      </DataSection>
    </Container>
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
