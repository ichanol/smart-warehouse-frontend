import { COLORS } from '../../../Constant'
import styled from 'styled-components'

const TextAreaInput = styled.textarea`
  width: 100%;
  height: ${({ height }) => height}px;

  border-radius: 8px;
  padding: ${({ border }) => (border ? '15px' : '0 15px 15px')};
  margin-bottom: ${({ marginBottom = 35 }) => marginBottom}px;
  border: ${({ border }) => (border ? '1px solid rgba(0, 0, 0, 0.2)' : 'none')};
  outline: none;

  resize: none;
  background-color: ${COLORS.natural.white};

  &:focus + .placeholder,
  &:not(:placeholder-shown) + .placeholder {
    top: -50px;
    left: 0;

    opacity: 1;
  }
  &::placeholder {
    opacity: 0;
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

export { TextAreaInput, Container }
