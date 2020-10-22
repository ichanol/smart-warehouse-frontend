import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const DataSection = styled.div`
  background-color: ${COLORS.natural.white};
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  .fixed-section {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .scroll-section {
    position: absolute;
    top: 0;
    left: ${({ multiplier }) => multiplier * 140}px;
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
  .cell {
    width: 140px;
    min-width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    position: relative;
  }
  .title span {
    margin-right: 5px;
  }
  .data {
    background-color: rgba(186, 205, 207, 0.2);
  }
  .permission {
    min-width: 750px;
  }
  .odd {
    background-color: rgba(209, 218, 220, 0.1);
  }
  .inactive {
    background-color: ${COLORS.red[100]};
  }

  .number-of-items-indicator {
    margin-top: 12px;
    color: ${COLORS.gray[600]};
  }

  .action {
    min-width: 200px;
  }

  .edit-wrapper {
    margin-left: 12px;
  }
`

const TitleSection = styled(DataSection)`
  margin-top: 25px;
  height: 60px;
  background-color: ${COLORS.natural.white};
  margin-top: 25px;
  position: relative;
  display: flex;

  .cell:hover > div {
    opacity: 1;
  }
`

const SortArrow = styled.div`
  position: absolute;
  right: 0;
  height: 30px;
  width: 15px;
  transition: all 0.15s linear;
  display: flex;
  justify-content: center;
  align-items: center;
`

export { DataSection, TitleSection, SortArrow }
