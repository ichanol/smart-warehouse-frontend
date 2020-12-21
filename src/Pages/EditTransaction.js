import {
  CancelButton,
  ChevronDownIcon,
  DropDown,
  SubmitButton,
  TextArea,
  ToggleButton,
} from '../components'
import {
  Container,
  DefaultProductListTable,
  DetailSection,
  EditSection,
  ProductList,
  ProductListWrapper,
  ProductTable,
  SpanInput,
} from './EditTransactionStyle'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { atomState } from '../Atoms'
import clsx from 'clsx'
import { debounce } from 'lodash'
import moment from 'moment'
import { requestHandler } from '../Services'

//select sum(amount) from inventory_log_product_list inner join inventory_log ON inventory_log_product_list.reference_number = inventory_log.id where inventory_log.status = 2 AND inventory_log.action_type > 1 AND inventory_log_product_list.product_id = 1;
const EditTransaction = () => {
  const { transactionref } = useParams()

  const history = useHistory()

  const transactionListState = useRecoilValue(atomState.transactionListState)
  const userState = useRecoilValue(atomState.userState)
  const setToastState = useSetRecoilState(atomState.toastState)

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

  const onKeyDownHandler = (event) => {
    if (isNaN(parseInt(event.key, 10)) && event.key !== 'Backspace') {
      event.preventDefault()
    }
  }

  const onChangeAction = (id) => setAction(actionList[id])

  const onChangeProductRemark = (index) =>
    debounce((text) => {
      const cloneObj = { ...editTransactionData }
      const cloneArr = [...cloneObj.data]
      const cloneTarget = { ...cloneArr[index] }
      cloneTarget.product_detail = text
      cloneArr[index] = cloneTarget
      cloneObj.data = cloneArr

      console.log(index, text)
      setEditTransactionData(cloneObj)
    }, 300)

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

      const response = await requestHandler(
        '/product-transaction',
        true,
        body,
        'post',
      )
      if (response.success) {
        setToastState((oldState) => [
          ...oldState,
          {
            onClick: () => {},
            title: 'Success',
            message: 'Update transaction successfully',
            dismiss: false,
            type: 'success',
          },
        ])
      }
    } catch (error) {
      setToastState((oldState) => [
        ...oldState,
        {
          onClick: () => {},
          title: 'Failed',
          message: 'Failed to update. Try again.',
          dismiss: false,
          type: 'error',
        },
      ])
    }
  }

  return (
    <Container>
      <div className='content'>
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
          <DefaultProductListTable>
            <input type='checkbox' defaultChecked />
            <div className='transaction-information'>
              <div className='transaction-information-title product-list-wrapper'>
                <span>Product List</span>
                <div className='chevron-wrapper'>
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
            <div className='table-wrapper'>
              <ProductTable>
                <ProductList className='sticky z1 no-border'>
                  <div className='serial-number'>
                    <span>Serial Number</span>
                  </div>
                  <div className='product-name'>
                    <span>Name</span>
                  </div>
                  <div className='amount'>
                    <span>Amount</span>
                  </div>
                  <div className='balance'>
                    <span>Balance</span>
                  </div>
                  <div className='location'>
                    <span>Location</span>
                  </div>
                </ProductList>
                {defaultEditTransactionData.data?.map((value, index) => {
                  return (
                    <ProductListWrapper key={index}>
                      <ProductList>
                        <div className='serial-number'>
                          <span>{value.product_id}</span>
                        </div>
                        <div className='product-name'>
                          <span>{value.product_name}</span>
                        </div>
                        <div className='amount'>
                          <span
                            className={clsx(
                              'product-information amount-tag',
                              defaultEditTransactionData.action_name.toLowerCase(),
                            )}>
                            {defaultEditTransactionData.action_type.toLowerCase() ===
                            'add'
                              ? '+'
                              : '-'}{' '}
                            {value.amount}
                          </span>
                        </div>
                        <div className='balance'>
                          <span>{value.balance.toLocaleString()}</span>
                        </div>
                        <div className='location'>
                          <span>{value.location}</span>
                        </div>
                      </ProductList>

                      <input type='checkbox' />
                      <div className='product-remark'>
                        {value.product_detail ? (
                          <TextArea
                            placeholder='Product Remark:'
                            disabled
                            defaultValue={value.product_detail}
                            marginBottom={0}
                            onValueChange={(text) => setTransactionRemark(text)}
                          />
                        ) : (
                          <span>No product remark</span>
                        )}
                      </div>
                    </ProductListWrapper>
                  )
                })}
              </ProductTable>
            </div>
          </DefaultProductListTable>
          {defaultEditTransactionData.detail && (
            <div className='text-area-wrapper'>
              <TextArea
                placeholder='Transaction Remark'
                defaultValue={defaultEditTransactionData.detail}
                height={80}
                disabled
              />
            </div>
          )}
        </DetailSection>
        <hr />
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
            <ProductList className='sticky z1 no-border'>
              <div className='serial-number'>
                <span>Serial Number</span>
              </div>
              <div className='product-name'>
                <span>Name</span>
              </div>
              <div className='amount'>
                <span>Amount</span>
              </div>
              <div className='location'>
                <span>Location</span>
              </div>
              {/* <div className='remark'>
                <span>Remark</span>
              </div> */}
            </ProductList>
            {editTransactionData.data?.map((value, index) => {
              return (
                <ProductListWrapper key={index}>
                  <ProductList>
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
                        onClick={(event) => event.preventDefault()}
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
                    <div className='location'>
                      <span>{value.location}</span>
                    </div>
                  </ProductList>
                  <input type='checkbox' />
                  <div className='product-remark'>
                    <TextArea
                      placeholder='Remark:'
                      border
                      defaultValue={value.product_detail}
                      onValueChange={onChangeProductRemark(index)}
                    />
                  </div>
                </ProductListWrapper>
              )
            })}
          </ProductTable>
          <div className='text-area-wrapper'>
            <TextArea
              placeholder='Transaction Remark'
              defaultValue={defaultEditTransactionData.detail}
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
