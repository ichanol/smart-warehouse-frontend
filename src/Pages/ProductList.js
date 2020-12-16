import {
  DropDown,
  NumberIndicator,
  Pagination,
  ResponsiveTable,
  SearchBox as useSearchBox,
} from '../components'
import React, { useEffect, useState } from 'react'

import { Container } from '../Pages/ProductListStyle'
import { useAxios } from '../Services'

const ProductList = () => {
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
  const itemPerPageList = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 50 },
    { name: 100 },
  ]

  const [productList, setProductList] = useState([])
  const [searchSuggest, setSearchSuggest] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState([])
  const [numberPerPage, setNumberPerPage] = useState(20)
  const [sort, setSort] = useState({ column: null, desc: false })
  const [totalRecord, setTotalRecord] = useState(null)

  const [
    searchText,
    searchTrigger,
    trigger,
    setTrigger,
    SearchBoxComponent,
  ] = useSearchBox(searchSuggest)

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
    if (searchText !== '') {
      setFetchSearchProductListData(true)
      setSearchProductListDataTrigger(!searchProductListDataTrigger)
    }
  }, [searchText])

  useEffect(() => {
    setSearchSuggest(searchProductListData.result)
    setTrigger(!trigger)
  }, [searchProductListData])

  const onSortByColumn = (column) =>
    setSort({ ...sort, column: column, desc: !sort.desc })

  const onChangeNumberPerPage = (index) => {
    setNumberPerPage(itemPerPageList[index].name)
    setActivePage(1)
  }

  const onClickPageNumber = (pageNumber) => setActivePage(pageNumber)

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
              selectedValue={numberPerPage}
              choices={itemPerPageList}
              onSelect={onChangeNumberPerPage}
              fullWidth={false}
            />
          </div>
        </div>
        <ResponsiveTable
          title={titleArray}
          data={productList}
          onSortByColumn={onSortByColumn}
          sort={sort}
          fixedDataColumn={fixedDataColumn}
          scrollDataColumn={scrollDataColumn}
          centerColumn={centerColumn}
        />
        <NumberIndicator
          numberPerPage={numberPerPage}
          activePage={activePage}
          totalRecord={totalRecord}
          numberOfShown={productList?.length}
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
