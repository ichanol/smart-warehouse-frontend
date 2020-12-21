import { COLORS, FONT } from '../Constant'
import styled, { keyframes } from 'styled-components'

const backgroundAnimation = keyframes`
0%{
      background-color: ${COLORS.green[500]};
}
100%{
      background-color: ${COLORS.green[300]};
}
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 25px 70px;

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
  }
  .content {
    flex: 1;
    display: flex;
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
  .create-button-wrapper {
    position: absolute;
    right: 0;
  }
`

const UploadIndicator = styled.div`
  display: flex;
  height: 20px;
  position: relative;

  border-radius: 8px;

  background-color: ${COLORS.gray[300]};
  overflow: hidden;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: ${({ percent }) => 100 - percent}%;

    animation: ${backgroundAnimation} 1.5s ease-in-out 0s infinite alternate;
    transition: all 0.2s ease-in-out;
  }
`

const SelectFile = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 150px;

  input {
    display: none;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 150px;

    border: 1px solid ${COLORS.gray[300]};
    border-radius: 8px;
    margin-top: 12px;

    cursor: pointer;

    span {
      margin-top: 12px;
      color: ${COLORS.gray[500]};
    }
  }
  .file-name {
    color: ${COLORS.gray[700]} !important;
  }
  .change-file{
    margin-top: 0 !important;
    
    color: ${COLORS.gray[500]} !important;
    font-size: ${FONT.m} !important;
    cursor: pointer;
  }
`

export { Container, UploadIndicator, SelectFile }
