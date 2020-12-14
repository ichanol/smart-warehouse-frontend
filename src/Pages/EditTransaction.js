import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Container } from './EditTransactionStyle'
import { atomState } from '../Atoms'
import { requestHandler } from '../Services'
import { useRecoilValue } from 'recoil'

const EditTransaction = () => {
  const { transactionref } = useParams()

  const history = useHistory()

  const transactionListState = useRecoilValue(atomState.transactionListState)

  const [editTransactionData, setEditTransactionData] = useState({})

  useEffect(() => {
    if (transactionref) {
      const [selectedTransaction] = transactionListState.filter(
        (value) => value.reference_number === parseInt(transactionref, 10),
      )
      if (selectedTransaction) {
        setEditTransactionData(selectedTransaction)
        console.log(selectedTransaction)
      } else {
        history.push('/transaction')
      }
    } else {
      history.push('/transaction')
    }
  }, [])

  const getActionList = async () => {
    const { success, result } = await requestHandler(
      '/import-export-product',
      true,
      {},
      'get',
    )
    console.log(result)
  }
  /**
   * {
        referenceNumber: Math.round(Math.random() * 1000),
        actionType: actionTabs.id,
        username: userState.username,
        productList: readProductListState,
        transactionRemark,
      }
   */
  return (
    <Container>
      <div className='header'>
        <span>Edit Transaction</span>
      </div>

      <div className='content'>
        {editTransactionData.reference_number}
        {editTransactionData.action_name}
        {editTransactionData.action_type}
        {editTransactionData.detail}
        {editTransactionData.data?.map((value) => value.product_id)}
      </div>
    </Container>
  )
}

export default EditTransaction
