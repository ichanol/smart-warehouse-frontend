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


function EditProduct(props) {
  const selected = props.location.state

  const history = useHistory()
  const { register, handleSubmit } = useForm()

  const [no] = useState(selected.value.no)
  const [id, setId] = useState(selected.value.productid)
  const [name, setName] = useState(selected.value.productname)
  const [amount, setAmount] = useState(selected.value.amount)
  const [company, setCompany] = useState(selected.value.company)
  const [description, setDescription] = useState('')



  const Edit = () => {
    const temp = selected.data
    console.log('clone:', temp)
    const x = temp.map((value) => {
      if (value.no === no) {
        return { no: no, productid: id, productname: name, amount: amount, description: description }
      } else {
        return value
      }
    })
    history.push({
      pathname: '/import-export',
      state: {
        data: x,
      },
    })
  }

  return (
    <Container>
      <Navbar />
      <Form onSubmit={handleSubmit(Edit)}>
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
            <Input
              name='id'
              ref={register}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              name='name'
              ref={register}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name='amount'
              ref={register({
                min: 1,
                max: 9999,
              })}
              value={amount}
              type='number'
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              name='company'
              ref={register}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Textarea
              name='discription'
              ref={register}
              onChange={(e) => setDescription(e.target.value)}
            />
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
