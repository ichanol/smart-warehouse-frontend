import { COLORS } from '../../../Constant'
import styled from 'styled-components'

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 100px;

  border-radius: 5px;
  padding: 15px;
  margin-bottom: 35px;
  border: 1px solid rgba(0, 0, 0, 0.2);
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
