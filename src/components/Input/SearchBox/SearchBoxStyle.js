import { COLORS, FONT } from '../../../Constant'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  position: relative;
  flex: 1;

  .search-box {
    flex: 1;

    outline: none;
    border: none;
    border-radius: 8px;
    padding: 0 80px 0 20px;
    
    font-size: ${FONT.l};
    transition: all linear 0.2s;
  }
  .search-box:focus {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .search-box::placeholder {
    color: ${COLORS.gray[600]};
  }

  .search-box:-ms-input-placeholder {
    color: ${COLORS.gray[600]};
  }

  .search-box::-ms-input-placeholder {
    color: ${COLORS.gray[600]};
  }
  .search-suggest {
    max-height: 250px;
    position: absolute;
    width: 100%;
    top: 50px;
    display: flex;
    flex-direction: column;

    padding: 25px;
    border-radius: 8px;
    
    overflow: auto;
    background-color: ${COLORS.gray[100]};
    z-index: 1;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .search-button,
  .clear-button {
    position: absolute;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    cursor: pointer;
  }
  .clear-button {
    right: 45px;
  }
  .search-suggest-data {
    display: flex;
    min-height: 35px;
    align-items: center;

    border-bottom: 1px solid ${COLORS.gray[200]};
    
    cursor: default;
  }
  .search-suggest-data:last-of-type {
    border: none;
  }
`

export { Container }
