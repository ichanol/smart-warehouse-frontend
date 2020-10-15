import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 20px;

  .clear-start {
    position: absolute;
    top: 25%;
    left: 40%;
  }

  .clear-end {
    position: absolute;
    top: 25%;
    left: 88%;
  }
  
`

const DateStart = styled.input`
  outline: 0;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: 0;
  border-bottom: 3px solid ${COLORS.gray[500]}; 
  text-align: center; 
  font-weight: bold;

  &&:focus {
    transition: 1s;
    border-bottom: 3px solid ${COLORS.orange[500]};
  }
`

const DateEnd = styled.input`
  outline: 0;
  font-size: 16px;
  width: 100%;
  height: 50px;
  border: 0;
  border-bottom: 3px solid ${COLORS.gray[500]};
  text-align: center; 
  font-weight: bold;

  &&:focus {
    transition: 1s;
    border-bottom: 3px solid ${COLORS.orange[500]};
  }
`

export { Wrapper, DateStart, DateEnd }
