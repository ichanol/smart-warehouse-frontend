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

export { PrimaryButton, OutlineButton }
