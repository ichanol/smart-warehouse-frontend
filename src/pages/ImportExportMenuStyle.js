import { COLORS } from '../Constant'
import styled from 'styled-components'

const Container = styled.div`
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
  }

  .header span {
    font-size: 22px;
  }

  .content {
    flex: 1;
    display: flex;
    background-color: ${COLORS.natural.white};
    padding: 25px;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .choice,
  .-disable {
    min-width: 250px;
    min-height: 75px;
    background-color: ${COLORS.green[200]};
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
  }

  .-disable {
    background-color: ${COLORS.green[100]};
    color: ${COLORS.gray[500]};
    cursor: not-allowed;
  }
`
export { Container }
