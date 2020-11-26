import {
  DropDown,
  Pagination,
  ResponsiveTable,
  SearchBox as useSearchBox,
} from '../components'
import React, { useEffect, useRef, useState } from 'react'

import { Container } from '../Pages/ProductListStyle'
import { useAxios } from '../Services'

const ProductList = () => {
  const dropDownRef = useRef()
  const scrollRef = useRef([])

  const [productList, setProductList] = useState([])
  const [searchSuggest, setSearchSuggest] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [numberPerPage, setNumberPerPage] = useState(20)
  const [sort, setSort] = useState({ column: null, desc: false })
  const [totalRecord, setTotalRecord] = useState(null)

  const [searchText, searchTrigger, trigger, setTrigger, SearchBoxComponent] = useSearchBox(
    searchSuggest,
  )

  const queryParams = {
    column: sort.column,
    desc: sort.desc,
    search: searchText === '' ? null : searchText,
    page: activePage,
    numberPerPage,
  }

  const [
    productListData,
    productListDataTrigger,
    setProductListDataTrigger,
    setFetchProductListData,
  ] = useAxios('/product-balance', true, queryParams, 'get')

  const [
    searchProductListData,
    searchProductListDataTrigger,
    setSearchProductListDataTrigger,
    setFetchSearchProductListData,
  ] = useAxios('/product-balance', true, queryParams, 'get')

  useEffect(() => {
    setFetchProductListData(true)
    const { result, totalPages, totalRecords } = productListData
    setProductList(result)
    setTotalRecord(totalRecords)
    if (totalPages) {
      setTotalPage(new Array(totalPages).fill(1))
    } else {
      setTotalPage([])
    }
  }, [productListData])

  useEffect(() => {
    setProductListDataTrigger(!productListDataTrigger)
  }, [sort, numberPerPage, activePage, searchTrigger])

  useEffect(() => {
    setFetchSearchProductListData(true)
    setSearchProductListDataTrigger(!searchProductListDataTrigger)
  }, [searchText])

  useEffect(() => {
    setSearchSuggest(searchProductListData.result)
    setTrigger(!trigger)
  }, [searchProductListData])

  const onSortByColumn = (column) =>
    setSort({ ...sort, column: column, desc: !sort.desc })

  const onChangeNumberPerPage = (number, primaryIndex) => {
    dropDownRef.current.scrollTop = 40 * (primaryIndex - 1)
    setNumberPerPage(number)
    setActivePage(1)
  }

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

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
          <div className='tools-bar'>{SearchBoxComponent}</div>
          <div className='tools-bar'>
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
        {productList?.length > 0 && (
          <div className='number-of-items-indicator'>
            Show{' '}
            {productList.length === 1
              ? null
              : `${(activePage - 1) * numberPerPage + 1} - `}
            {(activePage - 1) * numberPerPage + productList.length} of{' '}
            {totalRecord}
          </div>
        )}
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
