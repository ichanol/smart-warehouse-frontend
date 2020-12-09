import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const DataSection = styled.div`
  height: 500px;
  position: relative;
  display: flex;

  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${COLORS.natural.white};

  .no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    border-radius: 8px;

    background-color: ${COLORS.gray[100]};
  }

  .no-data-title {
    font-size: ${FONT.xl};
    text-transform: uppercase;
  }

  .fixed-section {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .scroll-section {
    position: absolute;
    top: 0;
    left: ${({ multiplier, isShowIndex }) =>
      isShowIndex ? multiplier * 140 + 75 : multiplier * 140}px;
    right: 0;

    overflow-x: auto;
    overflow-y: hidden;
  }
  .scroll-section::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .table-title-wrapper,
  .table-data-wrapper {
    height: 50px;
    display: flex;
    width: 100%;
  }
  .table-title-wrapper {
    height: 60px;
  }
  .table-data-wrapper {
    width: 100%;
  }
  .cell {
    width: 140px;
    min-width: 140px;
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
  }
  .center,
  .title {
    justify-content: center;
  }
  .title {
    color: ${({ darkHeader }) =>
      darkHeader ? COLORS.natural.white : COLORS.natural.black};
  }
  .data {
    padding: 0 20px;
    border-top: 1px solid ${COLORS.gray[200]};

    white-space: nowrap;
  }
  .primarykey {
    width: 75px;
    min-width: 75px;
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
  .edit-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 12px;

    cursor: pointer;
  }
`

const TitleSection = styled(DataSection)`
  height: 60px;
  position: relative;
  display: flex;

  background-color: ${({ darkHeader }) =>
    darkHeader ? COLORS.gray[900] : COLORS.natural.white};

  .cell:hover > div {
    opacity: 1;
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

const Container = styled.div`
  position: relative;

  border-radius: 8px;
  margin-top: 25px;
  padding: 12px;

  overflow: hidden;
  background-color: ${COLORS.natural.white};

  .arrow {
    min-width: 50px;
    min-height: 50px;
    position: absolute;
    top: 100%;

    background-color: red;
    cursor: pointer;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
`
export { DataSection, TitleSection, SortArrow, Container }
