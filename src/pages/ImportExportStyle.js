import styled from 'styled-components'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`

const Head = styled.label`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`

const BlockTable = styled.div`
  padding: 20px;
  height: 100%;
`

const BlockBtn = styled.form`
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0%);
  justify-content: space-around;
  width: 100%;
`

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 80px);
  filter: blur(${(props) => props.blur ? 10 : 0}px);
`

export { Header, Head, BlockBtn, Container, Content, BlockTable }
