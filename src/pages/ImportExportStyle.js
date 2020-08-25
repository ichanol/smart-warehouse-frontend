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
`

const BlockBtn = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-around;
`

export { Header, Head, BlockBtn }
