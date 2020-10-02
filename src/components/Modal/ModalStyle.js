import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
      background-color: rgba(0,0,0,0);
    }
    to {
      background-color: rgba(0,0,0,0.5);
    }
`

const fadeOut = keyframes`
    from {
      background-color: rgba(0,0,0,0.5);
    }
    to {
      background-color: rgba(0,0,0,0);
    }
`

const slideIn = keyframes`
    from{
        transform: translate(0px, 1000px);
        opacity: 0;
    }
    to{
        transform: translate(0px, 0px);
        opacity: 1;
    }
`

const slideOut = keyframes`
    from{
      transform: translate(0px, 0px);
      opacity: 1;
    }
    to{
      transform: translate(0px, 1000px);
      opacity: 0;
    }
`

export const Container = styled.div`
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  z-index: 5;

  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => props.isDisplay ? 'visible' : 'hidden'};
  animation: ${(props) => props.isDisplay ? fadeIn : fadeOut} 0.25s linear;
  transition: visibility 0.25s linear;
`

export const ModalBox = styled.div`
  min-width: 350px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 30px;
  position: relative;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.3),
    0 -10px 15px 0 rgba(255, 255, 255, 0.35);

  visibility: ${(props) => props.isDisplay ? 'visible' : 'hidden'};
  animation: ${(props) => props.isDisplay ? slideIn : slideOut} 0.25s linear;
  transition: visibility 0.25s linear;

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .primary-button,
  .secondary-button {
    background-color: ${(props) => props.primaryButtonFill};
    border: 2px solid ${(props) => props.primaryButtonStroke};
    color: ${(props) => props.primaryButtonColor};
    ${(props) => props.flex ? 'flex:1;' : null}
    padding: 0 20px;
    height: 45px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    margin: 10px;
    cursor: pointer;
    outline: none;
  }

  .secondary-button {
    background-color: ${(props) => props.secondaryButtonFill};
    border: 2px solid ${(props) => props.secondaryButtonStroke};
    color: ${(props) => props.secondaryButtonColor};
  }

  .activity-wrapper {
    margin: 15px 0;
  }
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  span {
    font-size: 22px;
    font-weight: bold;
  }
`

export const Detail = styled.div`
  width: 100%;
  max-height: 200px;
  overflow: auto;
  display: flex;
  margin-bottom: 25px;
  padding: 10px;

  span {
    text-align: center;
    width: 100%;
    font-size: 12pt;
    color: rgba(0, 0, 0, 0.75);
  }
  .hightlight {
    font-weight: bold;
    font-size: 14pt;
    color: red;
  }
`

const Modal = styled.div`
  min-width: 350px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 30px;
  position: relative;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.3),
    0 -10px 15px 0 rgba(255, 255, 255, 0.35);
  visibility: ${(props) => props.isDisplay ? 'visible' : 'hidden'};
  animation: ${(props) => props.isDisplay ? slideIn : slideOut} 0.25s linear;
  transition: visibility 0.25s linear;

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .activity-wrapper {
    margin: 15px 0;
  }
`

const ConfirmModal = styled(Modal)`
  .primary-button,
  .secondary-button {
    background-color: ${(props) => props.primaryButtonFill};
    border: 2px solid ${(props) => props.primaryButtonStroke};
    color: ${(props) => props.primaryButtonColor};
    flex: 1;
    padding: 0 20px;
    height: 45px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    margin: 10px;
    cursor: pointer;
    outline: none;
  }

  .secondary-button {
    background-color: transparent;
    border: 2px solid transparent;
    color: gray;
  }

  .modal-warning, .modal-success, .modal-retry, .modal-error;
`
const LoadingModal = styled(Modal)`
  .primary-button {
    background-color: ${(props) => props.primaryButtonFill};
    border: 2px solid ${(props) => props.primaryButtonStroke};
    color: ${(props) => props.primaryButtonColor};
    flex: 1;
    padding: 0 20px;
    height: 45px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    margin: 10px;
    cursor: pointer;
    outline: none;
  }
`
