import React from 'react'
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

function EditProduct(props) {

  const selected = props.location.state

  return (
    <Container>
      <Navbar />
      <Form>
        <Header>
          <Head>Edit Product</Head>
        </Header>
        <Content>
          <TopicBlock>
            <Topic>Product ID</Topic>
            <Topic>Product Name</Topic>
            <Topic>Amount</Topic>
            <Topic>Company Name</Topic>
            <Topic>Discription</Topic>
          </TopicBlock>
          <InputBlock>
            <Input value={selected.selected.productid} />
            <Input value={selected.selected.productname} />
            <Input value={selected.selected.amount} />
            <Input value={selected.selected.company} />
            <Textarea />
          </InputBlock>
        </Content>
        <BlockBtn>
          <CancelBtn />
          <SubmitBtn />
        </BlockBtn>
      </Form>
    </Container >
  )
}

export default EditProduct
