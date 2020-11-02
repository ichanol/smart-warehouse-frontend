import {
  DropDown,
  Pagination,
  ResponsiveTable,
  SearchBox,
} from '../components'
import React, { useEffect, useRef, useState } from 'react'

import { Container } from '../Pages/ProductListStyle'
import { atomState } from '../Atoms'
import { debounce } from 'lodash'
import { request } from '../Services'
import { useRecoilValue } from 'recoil'

const ProductList = () => {
  const searchRef = useRef()
  const dropDownRef = useRef()
  const scrollRef = useRef([])

  const userState = useRecoilValue(atomState.userState)

  const [productList, setProductList] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [numberPerPage, setNumberPerPage] = useState(20)
  const [search, setSearch] = useState({ status: false, data: [], text: '' })
  const [sort, setSort] = useState({ column: null, desc: false })

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: search.text === '' ? null : search.text,
    page: activePage,
    numberPerPage,
  }

  const onSortByColumn = (column) =>
    setSort({ ...sort, column: column, desc: !sort.desc })

  const getCurrentProductBalanceList = async () => {
    try {
      const res = await request(
        '/product-balance',
        queryParams,
        userState.accessToken,
        'get',
      )
      console.log(res)
      if (res.success) {
        const temp = []
        for (let i = 1; i <= res.totalPages; i = i + 1) {
          temp.push(i)
        }
        setTotalPage(temp)
        setProductList(res.result)
      }
    } catch (error) {}
  }

  const searchCurrentProductBalanceList = async () => {
    try {
      if (search.text === '') {
        setSearch({ ...search, data: [] })
      } else {
        const res = await request(
          '/product-balance',
          queryParams,
          userState.accessToken,
          'get',
        )
        console.log(res)
        if (res.success) {
          setSearch({ ...search, data: res.result })
        }
      }
    } catch (error) {}
  }

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    // setActivePage(1)
    // getProductsList(1, null, number)
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
  }

  const onSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      getCurrentProductBalanceList()
      // setActivePage(1)
      setSearch({ ...search, status: false })
    }
  }

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

  useEffect(() => {
    getCurrentProductBalanceList()
  }, [sort, numberPerPage, activePage])

  useEffect(() => {
    searchCurrentProductBalanceList()
  }, [search.text])

  const titleArray = [
    { title: 'Serial number', type: 'product_id', isSort: true },
    { title: 'Product name', type: 'product_name', isSort: true },
    { title: 'Balance', type: 'balance', isSort: true },
    { title: 'Company', type: 'company_name', isSort: true },
    { title: 'Location', type: 'location', isSort: true },
    { title: 'Updated at', type: 'updated_at', isSort: true },
  ]
  const fixedDataColumn = ['product_id', 'product_name', 'balance']
  const scrollDataColumn = ['company_name', 'location', 'updated_at']
  const centerColumn = ['balance']
  const itemPerPageList = [20, 40, 60, 80, 100]

  return (
    <Container>
      <div className='header'>
        <span>Product List</span>
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
            />
          </div>
          <div className='tools-bar'>
            <div className='item-per-page-placeholder'>
              <span>Shows: </span>
            </div>
            <DropDown
              ref={dropDownRef}
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
            />
          </div>
        </div>

        <ResponsiveTable
          ref={scrollRef}
          title={titleArray}
          data={productList}
          onSortByColumn={onSortByColumn}
          sort={sort}
          fixedDataColumn={fixedDataColumn}
          scrollDataColumn={scrollDataColumn}
          centerColumn={centerColumn}
        />
        <Pagination
          activePage={activePage}
          totalPage={totalPage}
          onChangePage={onClickPageNumber}
        />
      </div>
    </Container>
  )
}

export default ProductList
