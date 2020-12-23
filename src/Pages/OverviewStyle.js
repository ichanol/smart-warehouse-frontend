import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

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
    position: relative;
  }
  .activity-log-section{
    display: flex;
    flex-direction: column;
    width: 450px;
    min-width: 450px;
    position: relative;
    max-height: 670px;
    margin-right: 12px;
    
    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  .activity-log-header{
    position: sticky;
    top: 0;
    
    background-color: ${COLORS.gray[300]};
    /* background-color: ${COLORS.natural.white}; */
  }
  .activity-log{
    display: flex; 
    flex-direction: column;
  }
  .activity-log-information{
    width: 100%;
    height: 50px;

    margin-top: 12px;
    border-radius: 8px;

    background-color: ${COLORS.natural.white};

    :nth-child(1){
      margin: 0;
    }
  }
  .graph-section{
    display: flex;
    width: 100%;
    flex-direction: column;

    padding: 0 8px;
  }
  .chart {
    width: 500px;
    height: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 25px;
    border-radius: 8px;
    margin: 0 8px 8px;

    background-color: ${COLORS.natural.white};
  }

  @media (max-width: 1024px) {
    .content{
      flex-direction: column;
    }
    .activity-log-section{
      width: 100%;
    }
  }
`

export { Container }
