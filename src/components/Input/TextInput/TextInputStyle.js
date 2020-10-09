import { COLORS } from '../../../Constant'
import styled from 'styled-components'

const Input = styled.input`
  border-radius: 5px;
  background-color: ${COLORS.natural.white};
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  margin-bottom: 15px;
  padding-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ width }) => width ? `max-width: ${width}px;` : ''}
  ${({ height = 45 }) => `height: ${height}px;` }
  padding-right: 10px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export { Input }
