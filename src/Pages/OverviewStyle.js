import { COLORS, FONT } from '../Constant'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
from{
  transform: translate(-100%, 0);
  opacity: 0;

}to{
  transform: translate(0, 0);
  opacity: 1;
}`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 35px;

  overflow: auto;
  background-color: ${COLORS.gray[300]};

  .header {
    min-height: 35px;
    align-items: center;
    display: flex;

    padding-bottom: 20px;

    font-weight: bold;
    letter-spacing: 1px;
    background-color: ${COLORS.gray[300]};
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .content {
    flex: 1;
    display: flex;
    position: relative;

    overflow: hidden;
  }
  .activity-log-section {
    display: flex;
    flex-direction: column;
    min-width: 650px;
    position: relative;
    flex:1;
    margin-right: 12px;

    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  .activity-log-header {
    position: sticky;
    top: 0;

    background-color: ${COLORS.gray[300]};
    z-index: 1;
  }
  .activity-log {
    display: flex;
    flex-direction: column;
  }
  .socket-wrapper {
    display: flex;
    flex-direction: column-reverse;
  }
  .activity-log-information {
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
    position: relative;

    margin-top: 12px;
    border-radius: 8px;
    padding: 12px 200px 12px 75px;

    animation: ${slideIn} 1s ease-in-out;

    background-color: ${COLORS.natural.white};
  }
  .timestamp {
    position: absolute;
    right: 20px;

    color: ${COLORS.green[600]};
  }
  .log-detail {
    white-space: pre-line;
  }
  .graph-section {
    display: flex;
    width: 100%;
    flex-direction: column;

    padding: 0 8px;

    overflow: auto;
  }
  .chart {
    height: calc(50% - 50px - 16px);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 48px;
    border-radius: 8px;
    margin: 8px 0;

    background-color: ${COLORS.natural.white};
  }
  .chart-section {
    margin-top: 12px;
  }
  .card-section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .card {
    width: 350px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;

    background-color: ${COLORS.natural.white};
  }

  @media (max-width: 1024px) {
    .content {
      flex-direction: column;
    }
    .activity-log-section {
      width: 100%;
    }
    .chart {
      width: 100%;
    }
  }
`
const Thumbnail = styled.div`
  position: absolute;
  left: 20px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 35px;

  background-color: ${COLORS.gray[600]};
  color: ${COLORS.natural.white};
  text-transform: uppercase;
`

export { Container, Thumbnail }
