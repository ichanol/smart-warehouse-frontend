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
    flex: 1;
    background-color: rgba(209, 218, 220, 0.1);
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
    background-color: rgba(186, 205, 207, 0.2);
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
    max-width: 75px;
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

  .company,
  .data-company {
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
`

export { Table }
