import { Container } from './PaginationStyle'
import React from 'react'
import clsx from 'clsx'

const Pagination = ({ totalPage, onChangePage, activePage }) => {
  return (
    <Container>
      {totalPage?.map((value, index) => {
        if (totalPage.length <= 7) {
          return (
            <div
              className={clsx('page', value === activePage && 'active')}
              key={index}
              onClick={() => onChangePage(value)}>
              {value}
            </div>
          )
        } else if (totalPage.length > 5) {
          if (activePage < 5) {
            if (value <= 5) {
              return (
                <div
                  className={clsx('page', value === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(value)}>
                  {value}
                </div>
              )
            } else if (value === totalPage.length - 1) {
              return (
                <div className='page' key={index}>
                  ....
                </div>
              )
            } else if (value === totalPage.length) {
              return (
                <div
                  className={clsx('page', value === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(value)}>
                  {value}
                </div>
              )
            }
          } else if (activePage >= 5 && activePage <= totalPage.length - 4) {
            if (value === 1 || value === totalPage.length) {
              return (
                <div
                  className={clsx('page', value === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(value)}>
                  {value}
                </div>
              )
            } else if (value === 2 || value === totalPage.length - 1) {
              return (
                <div className='page' key={index}>
                  ...
                </div>
              )
            } else if (value >= activePage - 2 && value <= activePage + 2) {
              return (
                <div
                  className={clsx('page', value === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(value)}>
                  {value}
                </div>
              )
            }
          } else if (
            activePage > totalPage.length - 4 &&
            activePage <= totalPage.length
          ) {
            if (value === 1) {
              return (
                <div
                  className={clsx('page', value === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(value)}>
                  {value}
                </div>
              )
            } else if (value === 2) {
              return (
                <div className='page' key={index}>
                  ...
                </div>
              )
            } else if (
              value > totalPage.length - 5 &&
              value <= totalPage.length
            ) {
              return (
                <div
                  className={clsx('page', value === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(value)}>
                  {value}
                </div>
              )
            }
          }
        } else {
          return true
        }
      })}
    </Container>
  )
}

export default Pagination
