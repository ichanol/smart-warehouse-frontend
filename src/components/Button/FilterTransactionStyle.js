import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const Container = styled.label`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  font-size: ${FONT.l};

  .filter-icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    border-radius: 8px;

    cursor: pointer;
    background-color: ${COLORS.natural.white};
  }
  input[type='checkbox'] {
    width: 0;
    height: 0;
  }
  input:checked + .filter-options {
    max-width: 1500px;
    max-height: 500px;
  }
  .filter-options {
    display: flex;
    flex-direction: column;
    position: absolute;
    max-width: 100%;
    max-height: 0;
    left: 0;
    top: 40px;

    border-radius: 8px;

    overflow: hidden;
    background-color: ${COLORS.natural.white};
    z-index: 5;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .options-row {
    display: flex;
  }
  .checkbox {
    align-items: center;
    display: flex;
    min-width: 100px;

    margin: 8px;
  }
  .date-picker-wrapper {
    display: flex;
    width: fit-content;

    margin: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .custom-checkbox input[type='checkbox']:checked + .box {
    border-color: ${COLORS.blue[400]};

    background-color: ${COLORS.blue[400]};
  }
  .custom-checkbox input[type='checkbox']:checked + .box::after {
    display: block;
  }
  .custom-checkbox {
    display: flex;
    position: relative;
    width: 18px;
    height: 18px;
    justify-content: center;
    align-items: center;
  }
  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 4px;
    border: 1px solid ${COLORS.gray[400]};
  }
  .box::after {
    display: none;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 10px;

    border: solid ${COLORS.natural.white};
    border-width: 0 3px 3px 0;

    content: '';
    transform: translate(-50%, -60%) rotate(45deg);
  }
  .options {
    display: flex;
    flex: 1;

    padding: 20px;
  }
  .options-name {
    display: flex;
    flex: 1;
    max-width: 75px;

    margin: 8px;
  }
  .options-name span {
    color: ${COLORS.gray[700]};
    font-size: ${FONT.l};
    white-space: nowrap;
  }
  .option-actions {
    min-height: 5%;
    display: flex;
    flex-direction: column;
    flex: 1;

    padding: 0 15px;
  }
  .option-actions-row {
    display: flex;
    width: 280px;
    flex-wrap: wrap;

    padding: 0 15px;
  }
  .range-slider {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    padding: 20px;
  }
  .slider-wrapper {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;

    padding-right: 20px;
    margin-left: 60px;
  }
  .checkbox .title {
    margin-left: 8px;

    color: ${COLORS.gray[700]};
    font-size: ${FONT.l};
    white-space: nowrap;
  }
  .dismiss-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 4;
  }
`

export { Container }
