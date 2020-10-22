import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
    background-color: ${COLORS.natural.white};
    padding: 25px;
    position: relative;
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
    background-color: transparent;
    color: ${COLORS.gray[500]};
  }
  .value,
  .title {
    width: 100%;
    display: flex;
    height: 45px;
    align-items: center;
  }
  .value {
    background-color: rgba(171, 206, 180, 0.25);
    padding-left: 15px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    cursor: not-allowed;
    margin-bottom: 15px;
  }
`

const PermissionSection = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;

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
    text-transform: capitalize;
    margin-bottom: 12px;
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
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .expand {
    display: block;
    min-height: fit-content;
    max-height: fit-content;
  }
  .expand-button {
    cursor: pointer;
    position: absolute;
    bottom: -25px;
    left: 0px;
    font-size: ${FONT.m};
    color: ${COLORS.blue[500]};
  }
`

export { Container, PermissionSection }
