import { CancelIcon, SearchIcon } from '../../Icon'
import React, { useEffect, useRef, useState } from 'react'

import { Container } from './SearchBoxStyle'
import { debounce } from 'lodash'
import { isFirstCharacterSpace } from '../../../Utils'

const SearchBox = (DATA = [], field = 'product_name') => {
  const searchRef = useRef()

  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [status, setStatus] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [trigger, setTrigger] = useState(false)

  const onSearchInputChange = debounce((text) => {
    setSearch(text)
    if (text === '' || isFirstCharacterSpace(text)) {
      setStatus(false)
    } else {
      setStatus(true)
    }
  }, 300)

  const onSearchBoxBlur = () => {
    setData([])
    setStatus(false)
  }

  const onSearchBoxFocus = () => {
    setData([])
    setStatus(true)
  }

  const onClearSearchBox = () => {
    searchRef.current.value = ''
    setSearch('')
    setToggle(!toggle)
    setData([])
  }

  const onSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      setToggle(!toggle)
      setStatus(false)
    }
  }

  useEffect(() => {
    setData(DATA)
  }, [trigger])

  const SearchComponent = (
    <Container>
      <input
        ref={searchRef}
        className='search-box'
        type='text'
        placeholder='Search'
        onChange={({ target }) => {
          onSearchInputChange(target.value)
        }}
        onKeyDown={onSubmitSearch}
        onBlur={onSearchBoxBlur}
        onFocus={onSearchBoxFocus}
      />
      <div className='search-button'>
        <SearchIcon width={30} />
      </div>
      {search && (
        <div className='clear-button' onClick={onClearSearchBox}>
          <CancelIcon width={30} />
        </div>
      )}
      {data.length > 0 && status && (
        <div className='search-suggest'>
          {data.map((value, index) => (
            <div className='search-suggest-data' key={index}>
              <span>{value[field]}</span>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
  return [search, toggle, trigger, setTrigger, SearchComponent]
}

export default SearchBox
