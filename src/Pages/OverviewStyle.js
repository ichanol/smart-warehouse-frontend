import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 20px;

  overflow: auto;
  background-color: ${COLORS.gray[300]};

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
    position: relative;
    flex-direction: column;

    padding: 25px;

    background-color: ${COLORS.natural.white};
  }
`

export { Container }
