import { COLORS, FONT } from '../../Constant'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  padding-right: 20px;

  .clear-start {
    position: absolute;
    top: 30%;
    left: 30%;
  }

  .clear-end {
    position: absolute;
    top: 30%;
    left: 78%;
  }
  
  .calendar-start-icon {
    position: absolute;
    top: 30%;
    left: 40%;
  }

  .calendar-end-icon {
    position: absolute;
    top: 30%;
    left: 88%;
  }
`

const DateStart = styled.input`
  outline: 0;
  font-size: ${FONT.l};
  width: 100%;
  height: 50px;
  border: 0;
  border-right: 1px solid ${COLORS.gray[500]};
  text-align: left; 
  padding-left: 20px;
  font-weight: normal;
`

const DateEnd = styled.input`
  outline: 0;
  font-size: ${FONT.l};
  width: 100%;
  height: 50px;
  border: 0;
  border-left: 1px solid ${COLORS.gray[500]};
  text-align: left; 
  padding-left: 20px;
  font-weight: normal;
`

export { Wrapper, DateStart, DateEnd }
