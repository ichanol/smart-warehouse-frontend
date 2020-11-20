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
    margin-right: 12px;
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

    transition: all 0.2s linear;

    &:hover{
      z-index:1;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .filter-button:hover > .filter-options {
    display: flex;
  }
  .filter-options {
    display: none;
    position: absolute;
    width: fit-content;
    left: 0;
    top: 40px;
    z-index: 1;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
    flex-direction: column;
    background-color: ${COLORS.natural.white};
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
    margin: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: fit-content;
  }
  /* .checkbox:not(:first-child) {
    margin-top: 12px;
  } */
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
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    flex: 1;
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

  .transaction-information-title {
    display: flex;
    align-items: center;
    height: 50px;

    padding: 20px;
    margin: 25px 0 0;

    background-color: ${COLORS.natural.white};
    color: ${COLORS.gray[600]};

    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 0;
    height: 0;
  }

  .transaction-list {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;

    margin: 20px 0 0;
    transition: all 0.3s ease-in-out;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15),
      -5px -5px 10px rgba(255, 255, 255, 0.3);
    &:hover {
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1),
        -10px -10px 20px rgba(255, 255, 255, 0.5);
    }

    .product-list {
      height: 50px;
      display: flex;

      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-left: 8px solid transparent;
      padding: 0 20px 0 0;

      font-weight: 500;
      font-size: ${FONT.l};
      color: ${COLORS.gray[800]};
    }

    .product-list-title {
      color: ${COLORS.gray[600]};
    }

    .product-detail {
      display: flex;
      align-items: center;
      padding-left: 12px;
      flex: 1;
      min-width: 0;
    }

    .product-information {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .amount-tag {
      padding: 0 12px;
      border-radius: 4px;

      background-color: ${COLORS.red[100]};
      border: 2px solid ${COLORS.red[300]};
    }
    .add {
      background-color: ${COLORS.green[100]};
      border: 2px solid ${COLORS.green[400]};
    }

    .product-id {
      /* background-color: red; */
    }
    .product-name {
      /* background-color: orange; */
    }
    .product-amount {
      flex: 0.75;
      /* background-color: blue; */
    }
    .product-balance {
      flex: 0.75;
      /* background-color: coral; */
    }
    .product-location {
      /* background-color: lime; */
    }
    .product-remark {
      /* background-color: gray; */
    }
    .index {
      flex: 0.3;
      /* background-color: lime; */
    }
  }

  .transaction-information {
    display: flex;
    align-items: center;
    height: 50px;

    padding: 20px;

    background-color: ${COLORS.natural.white};
    cursor: pointer;
  }

  .transaction-product-list-container {
    width: 100%;
    height: 0;
    overflow: hidden;
    background-color: ${COLORS.natural.white};

    transition: all 0.2s ease-in-out;
  }

  input:checked + .transaction-product-list-container {
    height: 100%;
  }

  .transaction-detail,
  .transaction-title {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;

    padding: 0 12px;
  }

  .chevron-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  .transaction-reference-number {
  }
  .transaction-timestamp {
    flex: 1.4;
  }
  .transaction-type {
  }
  .transaction-remark {
  }
  .transaction-author {
    justify-content: center;
  }

  .export {
    border-left: 8px solid ${COLORS.red[400]};
  }
  .import {
    border-left: 8px solid ${COLORS.green[600]};
  }
`

export { Container }
