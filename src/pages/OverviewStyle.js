import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #e6eff0;
  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .header span {
    font-size: 22px;
  }
  .content {
    flex: 1;
    display: flex;
    background-color: white;
    padding: 25px;
  }
`

export { Container }
