import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  

  p {
    padding-left: 10px;
    
  }

  .dd-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    height: 50px;
    outline: 0;
    border: 0;
    background: ${COLORS.natural.white};
  }

  .dd-items {
    width: 100%;
    background: ${COLORS.natural.white};
    position: relative; 
    top: 100%;
    z-index: 1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); 
  }

  .dd-items ul {
    display: flex;
    align-items: center;
    height: 30px;
    &:hover {
      background: ${COLORS.gray[200]};
    }
  }

  .dd-items ul li { 
    padding-left: 10px;
    list-style: none;
  }

  .arrow {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ;
    transform: rotate(${props => props.open ? '-180deg' : 0});
    transform-origin: center center;
  }

`

export { Dropdown }
