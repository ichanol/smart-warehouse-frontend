import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  
  padding: 25px 70px;
  
  overflow: auto;
  background-color: ${COLORS.natural.white};

  .header {
    height: 35px;
    align-items: center;
    display: flex;

    margin-bottom: 20px;
    
    font-weight: bold;
    letter-spacing: 1px;
  }

  .header span {
    font-size: ${FONT.xl};
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }

  .cancle-button-wrapper {
    margin-right: 20px;
  }
`

export { Container }
