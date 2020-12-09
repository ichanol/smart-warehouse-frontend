import { COLORS } from '../../Constant'
import styled from 'styled-components'

const PrimaryButton = styled.button`
  width: 100px;
  height: 45px;

  border-radius: 8px;
  border: 3px solid ${COLORS.green[500]};
  
  color: ${COLORS.natural.white};
  letter-spacing: 2px;
  background-color: ${COLORS.green[500]};
  font-weight: bold;
  transition: all 0.15s ease-in-out;

  &:active {
    border-color: ${COLORS.green[600]};
  
    background-color: ${COLORS.green[600]};
  }
`
const OutlineButton = styled(PrimaryButton)`
  border: 3px solid ${({ color = COLORS.red[500] }) => color};
  
  color: ${({ color = COLORS.red[500] }) => color};
  background-color: transparent;

  &:active {
    border-color: ${({ color = COLORS.red[600] }) => color};

    background-color: ${({ color = COLORS.red[600] }) => color};
    color: white;
  }
`

const ToggleSwitch = styled.label`
  width: 48px;
  height: 24px;
  position: relative;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 24px;
    
    background-color: ${COLORS.gray[200]};
    transition: 0.4s;
    cursor: pointer;
  }
  .slider:before {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 50%;
    left: 4px;

    border-radius: 24px;

    content: '';
    transform: translateY(-50%);
    background-color: ${COLORS.gray[400]};
    transition: 0.4s;
  }
  input:checked + .slider {
    background-color: ${COLORS.green[500]};
  }
  input:checked + .slider:before {
    background-color: ${COLORS.gray[100]};
    transform: translate(20px, -50%);
  }
`

export { PrimaryButton, OutlineButton, ToggleSwitch }
