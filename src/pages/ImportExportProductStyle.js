import { COLORS } from '../Constant'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.gray[200]};

  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    filter: blur(${({ blur }) => blur ? 10 : 0}px);
  }

  .header span {
    font-size: 22px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.natural.white};
    padding: 0px;
    min-width: 100%;
    overflow: auto;
    filter: blur(${({ blur }) => blur ? 10 : 0}px);
    position: relative;
    
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .list-manipulate-button {
    display: flex;
  }

  .list-manipulate-button .cancle-button-wrapper {
    margin-left: 10px;
  }
`

export { Container }
