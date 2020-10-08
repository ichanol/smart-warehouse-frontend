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
    flex-direction: column;
    background-color: ${COLORS.natural.white};
    padding: 25px;
    position: relative;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }

  .cancle-button-wrapper {
    margin-left: 20px;
  }

  .title,
  .value {
    width: 100%;
    display: flex;
    height: 45px;
    align-items: center;
  }

  .value {
    background-color: rgba(171, 206, 180, 0.25);
    padding-left: 15px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    cursor: not-allowed;
    margin-bottom: 15px;
  }
`

export { Container }
