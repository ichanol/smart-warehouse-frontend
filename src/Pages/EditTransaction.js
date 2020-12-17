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
  DetailSection,
  EditSection,
  ProductList,
  ProductTable,
  SpanInput,
} from './EditTransactionStyle'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { atomState } from '../Atoms'
import clsx from 'clsx'
import moment from 'moment'
import { requestHandler } from '../Services'
import { useRecoilValue } from 'recoil'

const EditTransaction = () => {
  const { transactionref } = useParams()

  const history = useHistory()

  const transactionListState = useRecoilValue(atomState.transactionListState)
  const userState = useRecoilValue(atomState.userState)

  const [defaultEditTransactionData, setDefaultEditTransactionData] = useState(
    {},
  )
  const [editTransactionData, setEditTransactionData] = useState({})
  const [action, setAction] = useState({ action_name: '', id: 0 })
  const [actionList, setActionList] = useState([])
  const [transactionRemark, setTransactionRemark] = useState('')

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
        return result
      }
    } catch (error) {
      history.goBack()
      return false
    }
  }

  const getActionListHandler = async (selectedTransaction) => {
    const result = await getActionList()
    if (result) {
      const [temp] = result.filter(
        (value) => value.action_name === selectedTransaction.action_name,
      )
      setAction(temp)
    } else {
      history.push('/transaction')
    }
  }

  useEffect(() => {
    if (transactionref) {
      const [selectedTransaction] = transactionListState.filter(
        (value) => value.reference_number === parseInt(transactionref, 10),
      )
      if (selectedTransaction) {
        getActionListHandler(selectedTransaction)
        setEditTransactionData(selectedTransaction)
        setDefaultEditTransactionData(selectedTransaction)
      } else {
        history.push('/transaction')
      }
    } else {
      history.push('/transaction')
    }
  }, [])

  const onChangeAmount = (index) => ({
    currentTarget: { textContent: text },
  }) => {
    const cloneObj = { ...editTransactionData }
    const cloneArr = [...cloneObj.data]
    const cloneTarget = { ...cloneArr[index] }
    cloneTarget.amount = parseInt(text, 10)
    cloneArr[index] = cloneTarget
    cloneObj.data = cloneArr

    setEditTransactionData(cloneObj)
  }

  const onKeyDownHandler = (event) => {
    if (isNaN(parseInt(event.key, 10)) && event.key !== 'Backspace') {
      event.preventDefault()
    }
  }

  const onAmountBlur = (index) => ({ currentTarget: { textContent } }) => {
    if (textContent === '') {
      const cloneObj = { ...editTransactionData }
      const cloneArr = [...cloneObj.data]
      const cloneTarget = { ...cloneArr[index] }
      cloneTarget.amount = defaultEditTransactionData.data[index].amount
      cloneArr[index] = cloneTarget
      cloneObj.data = cloneArr

      setEditTransactionData(cloneObj)
    }
  }

  const onChangeAction = (id) => setAction(actionList[id])

  const onSubmit = async () => {
    try {
      const body = {
        referenceNumber: Math.round(Math.random() * 1000),
        actionType: action.id,
        username: userState.username,
        productList: editTransactionData.data,
        sourceTransaction: defaultEditTransactionData,
        transactionRemark,
      }

      console.log(body)
      // const response = await requestHandler(
      //   '/import-export-product',
      //   true,
      //   body,
      //   'post',
      // )
      // if (response.success) {
      // }
    } catch (error) {}
  }

  /**
   * {id: 1, action_name: "IMPORT"}
   * {
        referenceNumber: Math.round(Math.random() * 1000),
        actionType: actionTabs.id,
        username: userState.username,
        productList: readProductListState,
        transactionRemark,
      }

      amount: 100******
company_name: "Magic Box Asia"
id: 1*****
location: "Setthiwan 5th flr."*******
product_id: "a3KEeZbXBx"*******
product_name: "Drinking Glass"*********


transactionData.push([
        transactionId,
        parseInt(productList[index].id),
        parseInt(productList[index].amount),
        parseInt(productBalanceResult[index].balance) +
          parseInt(productList[index].amount * multiplier),
        productList[index].location,
        productList[index].detail,
      ]);
   */

  return (
    <Container>
      <div className='content'>
        <ToggleButton action={() => console.log(editTransactionData)} />

        <DetailSection>
          <div className='header sticky'>
            <span>Transaction Information</span>
          </div>
          <div className='transaction-information-column'>
            <div className='transaction-information'>
              <div className='transaction-information-title'>
                <span>Transaction Reference:</span>
              </div>
              <div className='transaction-information-data'>
                <span>{defaultEditTransactionData.reference_number}</span>
              </div>
            </div>
            <div className='transaction-information flex-end'>
              <div className='transaction-information-title'>
                <span>Created at:</span>
              </div>
              <div className='transaction-information-data'>
                <span>
                  {moment
                    .utc(defaultEditTransactionData.created_at)
                    .format('lll')}
                </span>
              </div>
            </div>
          </div>
          <div className='transaction-information'>
            <div className='transaction-information-title'>
              <span>Transaction type:</span>
            </div>
            <div
              className={clsx(
                'transaction-information-data capitalize action',
                defaultEditTransactionData.action_type
                  ?.toString()
                  .toLowerCase(),
              )}>
              <span>
                {defaultEditTransactionData.action_name
                  ?.toString()
                  .toLowerCase()}
              </span>
            </div>
          </div>
          <div className='transaction-information'>
            <div className='transaction-information-title'>
              <span>Responsable:</span>
            </div>
            <div className='transaction-information-data'>
              <span>{defaultEditTransactionData.username}</span>
            </div>
          </div>
          <div className='text-area-wrapper'>
            <TextArea
              placeholder='Detail'
              defaultValue={defaultEditTransactionData.detail}
              height={125}
              border
              disabled
            />
          </div>
        </DetailSection>
        <EditSection>
          <div className='header-wrapper sticky'>
            <div className='header'>
              <span>Edit Transaction</span>
            </div>
            <div className='transaction-information'>
              <div className='transaction-information-title'>
                <span>Transaction type:</span>
              </div>
              <div className='transaction-information-data'>
                <div
                  className={clsx(
                    'dropdown-wrapper',
                    action.action_name?.toString().toLowerCase(),
                  )}>
                  <DropDown
                    selectedValue={action.action_name}
                    choices={actionList}
                    onSelect={onChangeAction}
                    fullWidth={false}
                    placeholder={false}
                    field='action_name'
                    width='160px'
                    defaultValue={defaultEditTransactionData.action_name}
                  />
                </div>
              </div>
            </div>
          </div>

          <ProductTable>
            <ProductList className='sticky'>
              <div className='serial-number'>
                <span>Serial Number</span>
              </div>
              <div className='product-name'>
                <span>Name</span>
              </div>
              <div className='amount'>
                <span>Amount</span>
              </div>
              {/* <div className='balance'>
                <span>Balance</span>
              </div> */}
              <div className='location'>
                <span>Location</span>
              </div>
              {/* <div className='remark'>
                <span>Remark</span>
              </div> */}
            </ProductList>
            {editTransactionData.data?.map((value, index) => {
              return (
                <ProductList key={index}>
                  <div className='serial-number'>
                    <span>{value.product_id}</span>
                  </div>
                  <div className='product-name'>
                    <span>{value.product_name}</span>
                  </div>
                  <div className='amount'>
                    <SpanInput
                      contentEditable
                      role='textbox'
                      className={clsx(
                        'amount-tag',
                        action.action_name.toLowerCase(),
                      )}
                      onKeyDown={onKeyDownHandler}
                      onBlur={onAmountBlur(index)}
                      onInput={onChangeAmount(index)}
                      sign={
                        action.action_name.toLowerCase() === 'import'
                          ? '+ '
                          : '- '
                      }
                      placeholder={defaultEditTransactionData?.data[
                        index
                      ]?.amount.toLocaleString()}
                    />
                  </div>
                  {/* <div className='balance'>
                    <span>{value.balance.toLocaleString()}</span>
                  </div> */}
                  <div className='location'>
                    <span>{value.location}</span>
                  </div>
                  {/* <div className='remark'>
                    <span>{value.product_detail}</span>
                  </div> */}
                </ProductList>
              )
            })}
          </ProductTable>
          <div className='text-area-wrapper'>
            <TextArea
              placeholder='Detail'
              height={125}
              border
              onValueChange={(text) => setTransactionRemark(text)}
            />
          </div>
        </EditSection>

        <div />
        <div className='button-wrapper'>
          <SubmitButton action={onSubmit} />
          <div className='cancel-button-wrapper'>
            <CancelButton />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default EditTransaction
