import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 50px;
  display: flex;
  position: relative;

  padding: 15px 30px;

  background-color: ${COLORS.natural.white};
  box-shadow: 0 -5px 15px 5px rgba(0, 0, 0, 0.125);
  z-index: 1;
`

const Profile = styled.label`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;

  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .dismiss-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 4;
  }
  .thumbnail {
    width: 30px;
    height: 30px;

    border-radius: 35px;

    background-color: ${COLORS.red[300]};
  }

  span {
    margin: 0 10px;

    text-align: center;
    white-space: nowrap;
  }

  input[type='checkbox'] {
    width: 0;
    height: 0;
  }

  .profile-context-menu {
    position: absolute;
    top: 100%;
    right: 0;
    max-width: 100%;
    max-height: 0;
    display: flex;
    flex-direction: column;
    min-width: 100%;

    border-radius: 8px;

    z-index: 5;
    background-color: ${COLORS.natural.white};
    overflow: hidden;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }

  input:checked + .profile-context-menu {
    max-width: 600px;
    max-height: 600px;

    padding: 12px 0;
  }

  .profile-menu {
    height: 50px;
    min-width: 200px;
    display: flex;
    align-items: center;

    padding: 12px 24px;

    transition: all 0.25s ease-in-out;

    :hover {
      background-color: ${COLORS.gray[200]};
    }
  }

  @media only screen and (max-width: 1024px) {
    & > span {
      display: none;
    }
  }
`

export { Container, Profile }
