import React, { useState } from 'react'
import { Navbar, CancelBtn, SubmitBtn } from '../components'
import {
  Container,
  Form,
  Header,
  Head,
  TopicBlock,
  Topic,
  InputBlock,
  Content,
  Input,
  Textarea,
  BlockBtn,
} from './EditproductStyle'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const EditProduct = (props) => {
  const history = useHistory()
  const { productData, username } = props.location.state
  const [selectedProductInfo, setSelectedProductInfo] = useState(
    props.location.state.selectedProduct,
  )
  const { register, handleSubmit } = useForm()

  const textInputHandler = (value, field) => {
    const temp = { ...selectedProductInfo }
    temp[field] = value
    setSelectedProductInfo(temp)
  }

  const cancleEditProduct = () => {
    history.push({
      pathname: '/import-export',
      state: {
        data: productData,
      },
    })
  }

  const saveChanges = () => {
    const accumulator = [...productData]
    const newProductData = accumulator.map((value, key) => {
      if (value.id === selectedProductInfo.id) {
        return selectedProductInfo
      } else {
        return value
      }
    })
    history.push({
      pathname: '/import-export',
      state: {
        data: newProductData,
        username,
      },
    })
  }

  return (
    <Container>
      <Navbar />
      <Form onSubmit={handleSubmit(saveChanges)}>
        <Header>
          <Head>Edit Product</Head>
        </Header>
        <Content>
          <TopicBlock>
            <Topic>Product ID</Topic>
            <Topic>Product Name</Topic>
            <Topic>Company Name</Topic>
            <Topic>Amount</Topic>
            <Topic>Discription</Topic>
          </TopicBlock>
          <InputBlock>
            <Input
              name='id'
              ref={register}
              value={selectedProductInfo.product_serial_number}
              disabled
            />
            <Input
              name='name'
              ref={register}
              value={selectedProductInfo.product_name}
              disabled
            />
            <Input
              name='company'
              ref={register}
              value={selectedProductInfo.company_name}
              disabled
            />
            <Input
              name='amount'
              ref={register({
                min: 1,
                max: 9999,
              })}
              value={selectedProductInfo.amount}
              type='number'
              onChange={(e) => textInputHandler(e.target.value, 'amount')}
            />
            <Textarea
              name='discription'
              ref={register}
              onChange={(e) => textInputHandler(e.target.value, 'detail')}
            />
          </InputBlock>
        </Content>
        <BlockBtn>
          <CancelBtn action={cancleEditProduct} />
          <SubmitBtn action={() => {}} />
        </BlockBtn>
      </Form>
    </Container>
  )
}

export default EditProduct
