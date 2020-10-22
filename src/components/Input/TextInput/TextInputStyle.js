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
  ${({ width }) => (width ? `max-width: ${width}px;` : '')}
  ${({ height = 45 }) => `height: ${height}px;`}
  padding-right: 10px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus + .placeholder,
  &:not(:focus):not([value='']) + .placeholder {
    top: -50px;
    left: 0;
    opacity: 1;
  }
  &:disabled {
    cursor: not-allowed;
    border: none;
    background-color: rgba(0, 0, 0, 0.045);
    color: rgba(0, 0, 0, 0.5);
  }
`
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 40px;

  .placeholder {
    position: absolute;
    top: 0;
    left: 15px;
    transform: translateY(45%);
    transition: all 0.25s ease-in-out;
    opacity: 0.65;
  }
`

export { Input, Container }
