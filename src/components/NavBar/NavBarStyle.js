import { COLORS } from '../../Constant'
import styled from 'styled-components'

const SideBar = styled.div`
  width: 275px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;

  transition: all 0.25s ease-in-out;
  background-color: ${COLORS.gray[900]};
  z-index: ${({ open }) => (open ? '101' : '100')};

  .menu {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;

    padding: 15px 20px;
    border-left: 5px solid transparent;

    color: ${COLORS.gray[500]};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    :hover {
      border-color: ${COLORS.natural.white};

      color: ${COLORS.natural.white};
      background-color: ${COLORS.gray[900]};
    }
  }
  .menu-wrapper {
    display: flex;
    width: 250px;
    align-items: center;
  }
  .hamburger {
    height: 35px;
    display: none;
    flex-direction: column;
    justify-content: space-evenly;

    cursor: pointer;
  }
  .hamburger .line {
    width: 100%;

    border: 2px solid ${COLORS.natural.white};
    border-radius: 8px;

    background-color: ${COLORS.natural.white};
  }
  .line:nth-of-type(2) {
    margin: 6px 0;
  }
  .menu:first-of-type {
    margin-top: 25px;
  }
  .active-menu {
    border-color: ${COLORS.orange[500]};

    color: ${COLORS.orange[500]};
    background-color: ${COLORS.gray[800]};
  }
  .menu-title {
    margin-left: 15px;

    opacity: 1;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
  }
  .header-text {
    margin-top: 40px;
    margin-bottom: 25px;
    margin-left: 25px;

    color: ${COLORS.natural.white};
  }

  @media (max-width: 1024px) {
    width: ${({ open }) => (open ? '100%' : '65px')};
    min-width: 65px;
    position: fixed;
    height: 100%;

    overflow-y: auto;
    overflow-x: hidden;

    .menu-title {
      max-width: ${({ open }) => (open ? '100%' : '0')};

      margin-left: ${({ open }) => (open ? '15px' : '0')};

      transition: all 0.15s ease-in-out;
      opacity: ${({ open }) => (open ? 1 : 0)};
    }

    .menu {
      justify-content: center;
      min-height: 50px;
      margin-top: 15px;

      padding: 0;
    }

    .menu-wrapper {
      display: flex;
      width: ${({ open }) => (open ? '250px' : 'fit-content')};
      align-items: center;
    }

    .menu:first-of-type {
      margin-top: 65px;
    }

    br,
    .header-text {
      display: none;
    }

    .hamburger {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      min-height: 50px;
      width: 65px;
      justify-content: center;
      align-items: center;

      padding: 0 15px;
    }

    .line:nth-of-type(2) {
      transform: rotate(${({ open }) => (open ? '-45deg' : 0)});
      transition: all 0.2s ease-in-out;
    }

    .line:nth-of-type(1) {
      transform: translateY(${({ open }) => (open ? '10px' : 0)})
        rotate(${({ open }) => (open ? '45deg' : 0)});
      transform-origin: center;
      transition: all 0.2s ease-in-out;
    }

    .line:nth-of-type(3) {
      transform: translateY(${({ open }) => (open ? '-10px' : 0)})
        rotate(${({ open }) => (open ? '-225deg' : 0)});
      transform-origin: center;
      transition: all 0.2s ease-in-out;
    }
  }
`

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 75px;
  align-items: center;

  margin: 25px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  color: ${COLORS.natural.white};
  text-align: center;

  .title {
    position: relative;

    font-size: 38px;
  }
  .sub-script {
    position: absolute;
    top: 70%;
    left: 50%;
    font-size: 14px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

export { SideBar, Logo }
