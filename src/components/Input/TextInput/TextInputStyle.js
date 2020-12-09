import { COLORS } from '../../../Constant'
import styled from 'styled-components'

const Input = styled.input`
  ${({ width }) => (width ? `max-width: ${width}px;` : '')}
  ${({ height = 45 }) => `height: ${height}px;`}
  
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  margin-bottom: 15px;
  padding-left: 15px;
  text-overflow: ellipsis;

  background-color: ${COLORS.natural.white};
  white-space: nowrap;
  overflow: hidden;
  padding-right: 10px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus + .placeholder,
  &:disabled + .placeholder,
  &:not(:focus):valid + .placeholder {
    top: -50px;
    left: 0;

    opacity: 1;
  }
  &:disabled {
    border: none;

    background-color: rgba(0, 0, 0, 0.045);
    color: rgba(0, 0, 0, 0.5);
    cursor: not-allowed;
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

  .input-error-suggestion {
    position: absolute;
    top: -50px;
    right: 0;

    transform: translateY(45%);
    color: ${COLORS.red[500]};
  }
`

export { Input, Container }
