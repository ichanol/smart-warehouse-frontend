import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const Table = styled.div`
  min-height: 540px;
  max-height: 540px;
  position: relative;
  width: 100%;

  overflow: scroll;

  ::-webkit-scrollbar {
    width: 15px;
    height: 15px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    border-radius: 8px;

    background-clip: padding-box;
    background-color: rgba(0, 0, 0, 0.15);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  .table {
    width: fit-content;
    min-width: 100%;
    min-height: 525px;
    display: flex;
    flex: 1;

    background-color: ${COLORS.natural.white};
  }
  .fixed-section {
    position: sticky;
    left: 0;
    display: flex;
    flex-direction: column;

    z-index: 1;
    background-color: ${COLORS.natural.white};
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 10px rgba(0, 0, 0, ${({ isScroll }) => isScroll ? 0.05 : 0});
  }
  .scroll-section {
    display: flex;
    flex-direction: column;
    width: 100%;

    background-color: ${COLORS.natural.white};
    z-index: 0;
  }
  .fixed-headers,
  .scroll-headers {
    width: 100%;
    height: 75px;
    position: sticky;
    top: 0;
    display: flex;

    white-space: nowrap;
    background-color: ${COLORS.natural.white};
    z-index: 1;
  }
  .table-data-wrapper {
    height: 50px;
    display: flex;
    width: 100%;
  }
  .cell {
    min-width: 140px;
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;

    padding: 20px;
  }
  .center,
  .title {
    justify-content: center;
  }
  .data {
    padding: 0 20px;
    border-top: 1px solid ${COLORS.gray[200]};

    white-space: nowrap;
  }
  .primarykey {
    max-width: 75px;
    min-width: 0;
  }
  .time {
    white-space: break-spaces;
  }
  .data span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .permission {
    min-width: 750px;
  }
  .odd {
  }
  .inactive {
    background-color: ${COLORS.gray[100]};
    color: ${COLORS.gray[400]};
  }
  .number-of-items-indicator {
    margin-top: 12px;

    color: ${COLORS.gray[600]};
  }
  .action {
    min-width: 200px;
    justify-content: center;
  }
  .edit-wrapper,
  .delete-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 12px;

    cursor: pointer;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 25px;
  padding: 12px;
  border-radius: 8px;

  z-index: 0;
  background-color: ${COLORS.natural.white};

  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 87px;
    bottom: 12px;
    right: 12px;
    left: 12px;

    border-radius: 8px;

    background-color: ${COLORS.gray[100]};
    z-index: 3;
  }
  .no-data-title {
    font-size: ${FONT.xl};
    text-transform: uppercase;
  }
`

const SortArrow = styled.div`
  height: 30px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 8px;

  transition: all 0.15s linear;
`

export { Table, Wrapper, SortArrow }
