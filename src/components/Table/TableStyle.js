import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Table = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  padding: 10px;
  position: relative;

  .fixed-container {
    padding: 0 10px;
    position: fixed;
    background-color: ${COLORS.natural.white};
    top: 0;
    left: 0;
    right: 0;
  }

  .data-container {
    margin-top: 65px;
    overflow: auto;
  }

  .table-title-wrapper,
  .table-data-wrapper {
    height: 55px;
    display: flex;
    align-items: center;
    flex: 1;
    background-color: ${COLORS.rgba[100]};
  }

  .table-title-wrapper {
    background-color: ${COLORS.natural.white};
    font-weight: bold;
    height: 65px;
    text-overflow: ellipsis;
  }

  .table-data-wrapper {
    color: rgba(0, 0, 0, 0.7);
  }

  .table-data-wrapper:nth-child(odd) {
    background-color: ${COLORS.rgba[200]};
  }

  .table-title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-title span {
    max-width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-data-wrapper .table-title span {
    position: relative;
    top: 10%;
    max-width: 150px;
  }

  .no,
  .data-no {
    flex: 0.5;
  }

  .id,
  .data-id {
    flex: 2;
  }

  .name,
  .data-name {
    flex: 2;
  }

  .timestamp,
  .data-timestamp {
    flex: 2;
  }

  .amount,
  .data-amount {
    flex: 1.5;
  }

  .description,
  .data-description {
    flex: 2;
  }

  .action,
  .data-action {
    flex: 2;
  }

  .reporter,
  .data-reporter {
    flex: 2;
  } 

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 65px;
    text-align: center;
    background-color: ${COLORS.rgba[200]};
  }
`

export { Table }