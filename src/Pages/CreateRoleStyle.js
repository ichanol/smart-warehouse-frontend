import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 20px;
  
  overflow: auto;
  background-color: ${COLORS.gray[200]};

  .header {
    height: 35px;
    align-items: center;
    display: flex;

    margin-bottom: 20px;

    font-weight: bold;
    letter-spacing: 1px;
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;

    padding: 25px;

    background-color: ${COLORS.natural.white};
  }
  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }
  .cancel-button-wrapper {
    margin-right: 20px;
  }
  .cancel-button-wrapper > button {
    border: none;

    color: ${COLORS.gray[500]};
  }
  .cancel-button-wrapper > button:active {
    border: none;

    color: ${COLORS.gray[500]};
    background-color: transparent;
  }
`

const PermissionSection = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px;

  .permission-list {
    display: flex;
    min-height: 75px;
    max-height: 125px;
    position: relative;
    flex-direction: column;

    padding-right: 70px;
    margin-bottom: 46px;
    padding-top: 12px;
    border-top: 1px solid ${COLORS.gray[200]};
  }

  .permission-list:first-child {
    border: none;
  }
  .permission-title {
    margin-bottom: 12px;

    text-transform: capitalize;
    font-size: ${FONT.l};
  }
  .permission-detail {
    max-height: 75px;

    font-size: ${FONT.m};
  }
  .toggle-button-wrapper {
    display: flex;
    position: absolute;
    right: 0;
    top: 50%;

    transform: translateY(calc(-50% + 23px));
  }
  .collapse {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    overflow: hidden;
  }
  .expand {
    display: block;
    min-height: fit-content;
    max-height: fit-content;
  }
  .expand-button {
    position: absolute;
    bottom: -25px;
    left: 0px;

    cursor: pointer;
    font-size: ${FONT.m};
    color: ${COLORS.blue[500]};
  }
`

export { Container, PermissionSection }
