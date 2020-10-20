import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 20px;

  .page {
    width: 35px;
    height: 35px;
    background-color: ${COLORS.natural.white};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
    border-radius: 8px;
    cursor: pointer;
  }
  .active {
    background-color: ${COLORS.blue[300]};
    color: ${COLORS.natural.white};
  }
`

export { Container }
