import { DataSection, SortArrow, TitleSection } from './ResponsiveTableStyle'
import React, { forwardRef, useState } from 'react'

import { ChevronDownIcon } from '../Icon'
import { EditIcon } from '../Icon'
import { ToggleButton } from '../Button'
import clsx from 'clsx'
import propTypes from 'prop-types'

const ResponsiveTable = forwardRef(
  (
    {
      title,
      data,
      onSortByColumn,
      sort,
      onToggleSwitch,
      fixedDataColumn,
      scrollDataColumn,
      actionColumn,
      onEdit,
    },
    scrollRef,
  ) => {
    const [scrollState, setScrollState] = useState('data')

    const formatDate = (timeData) => {
      const [time] = timeData.split('Z')
      const newTime = new Date(time)
      return (
        newTime.getFullYear() +
        '/' +
        (newTime.getMonth() + 1) +
        '/' +
        newTime.getDate() +
        ' ' +
        newTime.getHours() +
        ':' +
        newTime.getMinutes() +
        ':' +
        newTime.getSeconds()
      )
    }

    const renderFixedDataColumn = (dataToRender, primaryIndex) => {
      return (
        <div
          className={clsx(
            'table-data-wrapper',
            !dataToRender.status && 'inactive',
          )}
          key={primaryIndex}>
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
            const isDateType = value.split('_')
            if (isDateType[1] === 'at') {
              return (
                <div
                  key={index}
                  className={clsx(
                    'cell data',
                    primaryIndex % 2 && 'odd',
                    !dataToRender.status && 'inactive',
                  )}>
                  <span>{formatDate(dataToRender[value])}</span>
                </div>
              )
            } else if (value === 'permission') {
              console.log(dataToRender[value])
              const temp = []
              for (const [permission, isPermitted] of Object.entries(
                dataToRender[value],
              )) {
                temp.push({ permission, isPermitted })
              }
              console.log('TEMP', temp)
              return (
                <div
                  key={index}
                  className={clsx(
                    'cell data permission',
                    primaryIndex % 2 && 'odd',
                    !dataToRender.status && 'inactive',
                  )}>
                  {temp.map((value, index) => <div>{value.permission}<input type='checkbox' checked={value.isPermitted}/></div>)}
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
                  <ToggleButton
                    value={dataToRender.status}
                    action={() => onToggleSwitch(primaryIndex)}
                  />
                  <div
                    className='edit-wrapper'
                    onClick={() => {
                      onEdit(primaryIndex)
                    }}>
                    <EditIcon />
                  </div>
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
      <React.Fragment>
        <TitleSection multiplier={fixedDataColumn.length}>
          <div className='fixed-section'>
            <div className='table-title-wrapper'>
              {title.map((value, index) => {
                if (index < fixedDataColumn.length) {
                  return (
                    <div
                      key={index}
                      className='cell title'
                      onClick={() => onSortByColumn(value.type)}>
                      <span>{value.title}</span>
                      {value.isSort && (
                        <SortArrow isActive={sort.option.desc}>
                          <ChevronDownIcon
                            isActive={sort.option.desc}
                            activeType={sort.option.type}
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
                        <SortArrow isActive={sort.option.desc}>
                          <ChevronDownIcon
                            isActive={sort.option.desc}
                            activeType={sort.option.type}
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
        <DataSection multiplier={fixedDataColumn.length}>
          <div
            className='fixed-section'
            ref={(ref) => (scrollRef.current[2] = ref)}>
            {data.map((value, index) => renderFixedDataColumn(value, index))}
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
            {data.map((value, index) => renderScrollDataColumn(value, index))}
          </div>
        </DataSection>
      </React.Fragment>
    )
  },
)

ResponsiveTable.propTypes = {
  title: propTypes.array,
  data: propTypes.array,
  onSortByColumn: propTypes.func,
  sort: propTypes.object,
  onToggleSwitch: propTypes.func,
  fixedDataColumn: propTypes.array,
  scrollDataColumn: propTypes.array,
  actionColumn: propTypes.string,
  onEdit: propTypes.func,
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
  fixedDataColumn: [],
  scrollDataColumn: [],
  actionColumn: '',
  onEdit: () => {},
}
export default ResponsiveTable
