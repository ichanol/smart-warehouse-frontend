import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.gray[300]};
  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 25px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .header > span {
    font-size: ${FONT.xl};
    margin-left: 25px;
  }
  .content {
    flex: 1;
    display: flex;
    padding: 0 25px 25px 25px;
    flex-direction: column;
    position: relative;
  }
  .tools-bar-wrapper {
    display: flex;
    flex-direction: column;
  }
  .tools-bar {
    height: 40px;
    display: flex;
    position: relative;
  }
  .tools-bar:not(:first-child) {
    margin-top: 12px;
  }
  .filter {
    display: flex;
    flex: 1;
    max-width: 40px;
  }
  .filter-button {
    background-color: ${COLORS.natural.white};
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${FONT.l};
    border-radius: 8px;
    cursor: pointer;
    position: relative;
  }
  .filter-button:hover > .filter-options {
    display: flex;
  }
  .filter-options {
    display: none;
    flex-direction: column;
    position: absolute;
    width: 300px;
    left: 0;
    top: 40px;
    z-index: 1;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .checkbox {
    align-items: center;
    display: flex;
  }
  .checkbox:not(:first-child) {
    margin-top: 12px;
  }
  .custom-checkbox input[type='checkbox'] {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .custom-checkbox input[type='checkbox']:checked + .box {
    background-color: ${COLORS.blue[400]};
    border-color: ${COLORS.blue[400]};
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
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid ${COLORS.gray[400]};
  }
  .box::after {
    display: none;
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%) rotate(45deg);
    width: 5px;
    height: 10px;
    border: solid ${COLORS.natural.white};
    border-width: 0 3px 3px 0;
  }
  .options {
    display: flex;
    flex: 1;
    background-color: ${COLORS.natural.white};
    padding: 20px;
  }
  .options-name {
    display: flex;
    flex: 1;
    max-width: 75px;
  }
  .options-name span {
    color: ${COLORS.gray[700]};
    font-size: ${FONT.l};
  }
  .option-actions {
    min-height: 5%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .checkbox .title {
    margin-left: 8px;
    color: ${COLORS.gray[700]};
    font-size: ${FONT.l};
  }
  .item-per-page-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 12px;
  }
  .items-per-page {
    display: flex;
    flex: 1;
    background-color: ${COLORS.natural.white};
    align-items: center;
    justify-content: center;
    max-width: 80px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
  }
  .items-per-page input {
    height: 0;
    width: 0;
  }
  .show-item-per-page {
    position: absolute;
  }
  .items-per-page input:checked + .choice-container {
    overflow-y: auto;
    height: 120px;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 1;
    display: block;
    border-radius: 8px;
    background-color: ${COLORS.natural.white};
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .items-per-page .choice-container {
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

  .number-of-items-indicator {
    margin-top: 12px;
    color: ${COLORS.gray[600]};
  }

  .create-new-button {
    width: 125px;
    height: 100%;
    background-color: ${COLORS.green[500]};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    position: absolute;
    right: 0;
    color: ${COLORS.natural.white};
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  /* width */
  .search-suggest::-webkit-scrollbar,
  .choice-container::-webkit-scrollbar {
    width: 0px;
  }

  /* Track */
  .search-suggest::-webkit-scrollbar-track,
  .choice-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  .search-suggest::-webkit-scrollbar-thumb,
  .choice-container::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  .search-suggest::-webkit-scrollbar-thumb:hover,
  .choice-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export { Container }