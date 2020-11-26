import { Container } from './PaginationStyle'
import React from 'react'
import clsx from 'clsx'

const Pagination = ({ totalPage, onChangePage, activePage }) => {
  return (
    <Container>
      {totalPage?.map((value, index) => {
        const pageNumber = index + 1
        if (totalPage.length <= 7) {
          return (
            <div
              className={clsx('page', pageNumber === activePage && 'active')}
              key={index}
              onClick={() => onChangePage(pageNumber)}>
              {pageNumber}
            </div>
          )
        } else if (totalPage.length > 5) {
          if (activePage < 5) {
            if (pageNumber <= 5) {
              return (
                <div
                  className={clsx('page', pageNumber === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(pageNumber)}>
                  {pageNumber}
                </div>
              )
            } else if (pageNumber === totalPage.length - 1) {
              return (
                <div className='page' key={index}>
                  ....
                </div>
              )
            } else if (pageNumber === totalPage.length) {
              return (
                <div
                  className={clsx('page', pageNumber === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(pageNumber)}>
                  {pageNumber}
                </div>
              )
            }
          } else if (activePage >= 5 && activePage <= totalPage.length - 4) {
            if (pageNumber === 1 || pageNumber === totalPage.length) {
              return (
                <div
                  className={clsx('page', pageNumber === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(pageNumber)}>
                  {pageNumber}
                </div>
              )
            } else if (pageNumber === 2 || pageNumber === totalPage.length - 1) {
              return (
                <div className='page' key={index}>
                  ...
                </div>
              )
            } else if (pageNumber >= activePage - 2 && pageNumber <= activePage + 2) {
              return (
                <div
                  className={clsx('page', pageNumber === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(pageNumber)}>
                  {pageNumber}
                </div>
              )
            }
          } else if (
            activePage > totalPage.length - 4 &&
            activePage <= totalPage.length
          ) {
            if (pageNumber === 1) {
              return (
                <div
                  className={clsx('page', pageNumber === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(pageNumber)}>
                  {pageNumber}
                </div>
              )
            } else if (pageNumber === 2) {
              return (
                <div className='page' key={index}>
                  ...
                </div>
              )
            } else if (
              pageNumber > totalPage.length - 5 &&
              pageNumber <= totalPage.length
            ) {
              return (
                <div
                  className={clsx('page', pageNumber === activePage && 'active')}
                  key={index}
                  onClick={() => onChangePage(pageNumber)}>
                  {pageNumber}
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
