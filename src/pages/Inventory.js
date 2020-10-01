import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar, Filter, InventoryTable, FilterBtn } from '../components'
import {
  Container,
  Header,
  Head,
  Content,
  FilterBlock,
  TableBlock,
  ButtonBlock,
  Empty,
} from './InventoryStyle'

function Inventory() {
  const tableName = 'inventory'
  const [data, setData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false) // TRUE || FALSE
  const [filterSelected, setFilterSelected] = useState('')
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState({ column: '', isSortUp: false, sortDirection: '' })

  const handleSort = (name) => {
    return sort.column === name ?
      setSort({
        column: name,
        isSortUp: !sort.isSortUp,
        sortDirection: sort.isSortUp ? 'ASC' : 'DESC',
      }) :
      setSort({
        column: name,
        isSortUp: true,
        sortDirection: 'DESC',
      })
  }

  const handlerToggleFilter = () => {
    return toggleFilter ? setToggleFilter(false) : setToggleFilter(true)
  }

  const search = (e) => {
    setKeyword(e.target.value)
  }

  const clear = () => {
    setStartDate('')
    setEndDate('')
    setFilterSelected('')
    setKeyword('')
  }

  const dropdownFilter = (e) => {
    setFilterSelected(e.target.value)
  }

  const sortApi = () => {
    const URL = `http://192.168.56.1:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}&column=${sort.column}&sort=${sort.sortDirection}&table=${tableName}`
    axios({
      url: URL,
      method: 'get',
    })
      .then(res => {
        setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
  }

  const setStart = (date) => {
    setStartDate(date)
  }

  const setEnd = (date) => {
    setEndDate(date)
  }

  const listBalance = async () => {
    const URL = 'http://localhost:8000/api/smart-warehouse/product-balance'
    axios({
      url: URL,
    })
      .then(res => {
        setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
  }

  const submitFilter = (e) => {
    e.preventDefault()
    axios({
      url: `http://localhost:8000/api/smart-warehouse/product-transaction?startdate=${startDate}&enddate=${endDate}`,
      method: 'get',
    })
      .then(res => {
        setData(res.data.result)
      })
      .catch(err => {
        throw err
      })
    setToggleFilter(false)
    setFilterSelected(filterSelected)
    setKeyword(keyword)
    setStart(startDate)
    setEndDate(endDate)
  }

  useEffect(() => {
    listBalance()
    sortApi()
  }, [sort])

  return (
    <Container>
      <Navbar selectedMenu={4} />
      <Header>
        <Empty />
        <Head>Inventory</Head>
        <ButtonBlock>
          <div>
            <FilterBtn
              toggle={handlerToggleFilter}
            />
            {toggleFilter &&
              (
                <FilterBlock>
                  <Filter
                    start={startDate}
                    end={endDate}
                    setStart={setStart}
                    setEnd={setEnd}
                    submitFilter={submitFilter}
                    filterSelected={filterSelected}
                    keyword={keyword}
                    search={search}
                    dropdownFilter={dropdownFilter}
                    clear={clear}
                  />
                </FilterBlock>
              )
            }
          </div>
        </ButtonBlock>
      </Header>
      <Content>
        <TableBlock>
          <InventoryTable
            data={data}
            handleSort={handleSort}
          />
        </TableBlock>
      </Content>
    </Container>
  )
}

export default Inventory
