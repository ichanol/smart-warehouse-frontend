import { COLORS } from '../../Constant'
import styled from 'styled-components'

const PrimaryButton = styled.button`
  width: 100px;
  height: 45px;
  border-radius: 8px;
  color: ${COLORS.natural.white};
  letter-spacing: 2px;
  background-color: ${COLORS.green[500]};
  font-weight: bold;
  transition: all 0.15s ease-in-out;
  border: 3px solid ${COLORS.green[500]};

  &:active {
    background-color: ${COLORS.green[600]};
    border-color: ${COLORS.green[600]};
  }
`
const OutlineButton = styled(PrimaryButton)`
  color: ${({ color = COLORS.red[500] }) => color};
  background-color: transparent;
  border: 3px solid ${({ color = COLORS.red[500] }) => color};
  &:active {
    color: white;
    background-color: ${({ color = COLORS.red[600] }) => color};
    border-color: ${({ color = COLORS.red[600] }) => color};
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
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${COLORS.gray[200]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 24px;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    top: 50%;
    transform: translateY(-50%);
    left: 4px;
    background-color: ${COLORS.gray[400]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 24px;
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
