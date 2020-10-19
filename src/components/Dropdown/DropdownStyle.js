import { COLORS, FONT } from '../../Constant'
import styled from 'styled-components'

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    padding-left: 10px; 
    font-weight: normal;
  }

  .dropdown-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    height: 50px;
    outline: 0;
    border: 0;
    background: ${COLORS.natural.white};
    font-size: ${FONT.l};
  }

  .dropdown-items {
    width: 100%;
    background: ${COLORS.natural.white};
    position: relative; 
    top: 100%;
    z-index: 1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); 
  }

  .dropdown-items ul {
    display: flex;
    align-items: center;
    height: 30px;
    &:hover {
      background: ${COLORS.gray[200]};
    }
  }

  .dropdown-items ul li { 
    padding-left: 10px;
    font-size: ${FONT.l};
    list-style: none;
    font-weight: normal;
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

export { DropDownContainer }
