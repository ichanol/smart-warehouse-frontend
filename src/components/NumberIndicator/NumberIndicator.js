import { Container } from './NumberIndicatorStyle'
import React from 'react'

const NumberIndicator = ({
  numberPerPage,
  activePage,
  totalRecord,
  numberOfShown,
}) => {
  return (
    numberOfShown > 0 && (
      <Container>
        Show {(activePage - 1) * numberPerPage + 1} -{' '}
        {(activePage - 1) * numberPerPage + numberOfShown} of {totalRecord}
      </Container>
    )
  )
}

export default NumberIndicator
