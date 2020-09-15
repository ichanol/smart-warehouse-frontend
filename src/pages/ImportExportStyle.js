import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

const Head = styled.label`
  font-size: 30px;
  font-weight: bold;
  color: #FFF;
`

const BlockTable = styled.div`
  padding: 20px;
  height: 100%;
`

const BlockBtn = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

export { Container, Header, Head, BlockTable, BlockBtn }
