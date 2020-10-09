import { COLORS } from '../../../Constant'
import styled from 'styled-components'

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border-radius: 5px;
  background-color: ${COLORS.natural.white};
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  margin-bottom: 35px;
`

export { TextAreaInput }
