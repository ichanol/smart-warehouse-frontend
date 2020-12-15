import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Container } from './EditTransactionStyle'
import { DropDown } from '../components'
import { atomState } from '../Atoms'
import { requestHandler } from '../Services'
import { useRecoilValue } from 'recoil'

const EditTransaction = () => {
  const { transactionref } = useParams()

  const history = useHistory()

  const transactionListState = useRecoilValue(atomState.transactionListState)

  const [editTransactionData, setEditTransactionData] = useState({})
  const [action, setAction] = useState()
  const [actionList, setActionList] = useState()

  useEffect(() => {
    getActionList()
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
    try {
      const { success, result } = await requestHandler(
        '/import-export-product',
        true,
        {},
        'get',
      )
      console.log(result)
      setActionList(result)
    } catch (error) {
      history.goBack()
    }
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

  const onChangeNumberPerPage = (id) => {
    setAction(id)
  }

  useEffect(() => {
    const listener = (event) => {
      console.log('scroll', event)
    }
    window.addEventListener('scroll', listener, true)

    return () => window.removeEventListener('scroll', listener, true)
  }, [])
  return (
    <Container>
      <div className='header'>
        <span>Edit Transaction</span>
      </div>

      <div className='content'>
        <DropDown
          selectedValue={action}
          choices={actionList}
          onSelect={onChangeNumberPerPage}
          fullWidth={false}
          placeholder
          field='action_name'
        />
        <div>{editTransactionData.reference_number}</div>
        <div>{editTransactionData.action_name}</div>
        <div>{editTransactionData.action_type}</div>
        <div>{editTransactionData.detail}</div>
        <br />
        <br />
        <div>
          <div>
            <span>S/N</span>
          </div>
          <div>
            <span>Name</span>
          </div>
          <div>
            <span>Amount</span>
          </div>
          <div>
            <span>Balance</span>
          </div>
          <div>
            <span>Location</span>
          </div>
          <div>
            <span>Remark</span>
          </div>
        </div>
        <br />
        <br />
        <div>
          {editTransactionData.data?.map((value, index) => {
            return (
              <div key={index}>
                <div>{value.product_id}</div>
                <div>{value.product_name}</div>
                <div>{value.amount}</div>
                <div>{value.balance}</div>
                <div>{value.location}</div>
                <div>{value.product_detail}</div>
                <hr />
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export default EditTransaction
