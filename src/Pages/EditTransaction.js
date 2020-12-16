import {
  CancelButton,
  DropDown,
  SubmitButton,
  TextArea,
  TextInput,
  ToggleButton,
} from '../components'
import {
  Container,
  ProductTable,
  TransactionDetail,
} from './EditTransactionStyle'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { atomState } from '../Atoms'
import moment from 'moment'
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
        setAction(selectedTransaction.action_name)

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
      if (success) {
        setActionList(result)
      }
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

  const onChangeAction = (id) => {
    setAction(actionList[id].action_name)
  }

  return (
    <Container>
      <div className='header'>
        <span>Edit Transaction</span>
      </div>

      <div className='content'>
        {/* <ToggleButton />
        <div className='dropdown-wrapper'>
          <DropDown
            selectedValue={action}
            choices={actionList}
            onSelect={onChangeAction}
            fullWidth={false}
            placeholder={false}
            field='action_name'
            width='120px'
          />
        </div> */}
        <TransactionDetail>
          {/* <span className='transaction-title'>Transaction Detail</span> */}

          <div className='transaction-information-column'>
            <div className='transaction-information'>
              <div className='transaction-information-title'>
                <span>Transaction Reference:</span>
              </div>
              <div className='transaction-information-data'>
                <span>{editTransactionData.reference_number}</span>
              </div>
            </div>
            <div className='transaction-information flex-end'>
              <div className='transaction-information-title'>
                <span>Created at:</span>
              </div>
              <div className='transaction-information-data'>
                <span>
                  {moment.utc(editTransactionData.created_at).format('lll')}
                </span>
              </div>
            </div>
          </div>
          <div className='transaction-information'>
            <div className='transaction-information-title'>
              <span>Responsable:</span>
            </div>
            <div className='transaction-information-data'>
              <span>{editTransactionData.username}</span>
            </div>
          </div>
          <div className='text-area-wrapper'>
            <TextArea
              placeholder='Detail'
              defaultValue={editTransactionData.detail}
              height={125}
              border
            />
          </div>
        </TransactionDetail>
        <span className='transaction-title'>Product List</span>
        <ProductTable>{}</ProductTable>
        {/* <TextInput /> */}
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
        <div className='button-wrapper'>
          <SubmitButton />
          <div className='cancel-button-wrapper'>
            <CancelButton />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default EditTransaction
