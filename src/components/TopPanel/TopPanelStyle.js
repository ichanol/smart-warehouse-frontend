import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${COLORS.natural.white};
  min-height: 50px;
  position: sticky;
  top: 0;
  right: 0;
  display: flex;
  padding: 15px 30px;
  box-shadow: 0 -5px 15px 5px rgba(0, 0, 0, 0.125);
  z-index: 3;

  .wrapper {
    flex: 1;
    position: relative;
  }

  .profile {
    position: absolute;
    height: 80%;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .profile:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .thumbnail {
    width: 30px;
    height: 30px;
    background-color: ${COLORS.red[300]};
    border-radius: 35px;
  }

  .profile span {
    margin: 0 10px;
    text-align: center;
  }

  @media only screen and (max-width: 1024px) {
    .profile span {
      display: none;
    }
  }
`

export { Container }
