import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  flex: 1;
  background-color: ${COLORS.natural.white};
  align-items: center;
  justify-content: center;
  max-width: 80px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  input {
    height: 0;
    width: 0;
  }
  .show-item-per-page {
    position: absolute;
  }
  input:checked + .choice-container {
    overflow-y: auto;
    height: 120px;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 5;
    display: block;
    border-radius: 8px;
    background-color: ${COLORS.natural.white};
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .choice-container {
    border-radius: 0;
    height: 0px;
    width: 100%;
    overflow: hidden;
    align-items: center;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
  }
  .item-per-page-choice {
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid ${COLORS.gray[200]};
  }
  .display-choice-container {
    background-color: ${COLORS.red[400]};
    width: 200%;
    height: 185px;
    position: absolute;
    left: 0;
    z-index: 1;
  }
  .disable-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
  }

  .choice-container::-webkit-scrollbar {
    width: 0px;
  }

  .choice-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .choice-container::-webkit-scrollbar-thumb {
    background: #888;
  }

  .choice-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export { Container }
