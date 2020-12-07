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
  .filter-wrapper {
    display: flex;
    flex: 1;
    max-width: 40px;
    margin-right: 12px;
  }
`

const TransactionTitle = styled.div`
  display: flex;
  align-items: center;
  height: 50px;

  padding: 20px 70px 20px 20px;
  margin: 25px 0 0;

  background-color: ${COLORS.natural.white};
  color: ${COLORS.gray[600]};

  cursor: pointer;

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
  .transaction-menu {
    max-width: 50px;
    position: relative;
    justify-content: center;

    padding: 0;
    border-radius: 50px;

    cursor: pointer;
    background-color: red;
  }
`

const TransactionList = styled.label`
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

  .dismiss-context {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    z-index: 4;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: all 0.2s linear;
  }

  input[type='checkbox'] {
    width: 0;
    height: 0;
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
  .transaction-menu {
    max-width: 50px;
    position: relative;
    justify-content: center;

    padding: 0;

    cursor: pointer;
    background-color: ${COLORS.natural.white};
    ${({ isOpen }) => (isOpen ? 'z-index: 5;' : null)}
  }
  .transaction-context-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-width: ${({ isOpen }) => (isOpen ? '250px' : '50px')};
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0px')};
    top: 50px;
    right: 0;

    padding: 12px;

    z-index: 6;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15),
      -5px -5px 10px rgba(255, 255, 255, 0.3);
    background-color: ${COLORS.natural.white};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    color: ${COLORS.gray[700]};
  }
  .transaction-record-menu {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 12px;
    /* justify-content: center; */
  }
  .transaction-record-menu-title {
    margin: 0 12px;
    white-space: nowrap;
  }

  .export, .expired, .damaged {
    border-left: 8px solid ${COLORS.red[400]};
  }
  .import {
    border-left: 8px solid ${COLORS.green[600]};
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
`

export { Container, TransactionTitle, TransactionList }
