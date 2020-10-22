import { CancelIcon, SearchIcon } from '../../Icon'
import React, { forwardRef } from 'react'

import { Container } from './SearchBoxStyle'

const SearchBox = forwardRef(
  (
    {
      onSearchInputChange,
      onSubmitSearch,
      onSearchBoxBlur,
      onSearchBoxFocus,
      onClearSearchBox,
      text,
      data,
      status,
      field = 'product_name',
    },
    searchRef,
  ) => {
    return (
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
        {text && (
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
  },
)

export default SearchBox
