import styled from 'styled-components'

const SideBar = styled.div`
  box-sizing: border-box;
  width: 275px;
  height: 100%;
  background-color: #1c1c1c;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease-in;
  z-index: 4;
  position: fixed;
  .menu {
    display: flex;
    padding: 15px 20px;
    width: 100%;
    height: 50px;
    color: rgba(255, 255, 255, 0.7);
    border-left: 5px solid transparent;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
  }
  .hamburger {
    height: 35px;
    display: none;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .hamburger .line {
    width: 100%;
    border: 2px solid white;
    border-radius: 2px;
  }
  .line:nth-of-type(2) {
    margin: 6px 0;
  }
  .menu:hover {
    color: white;
    border-color: white;
    background-color: #171717;
  }
  .menu:first-of-type {
    margin-top: 25px;
  }
  .active-menu {
    color: #ff9e1f;
    border-color: #ff9e1f;
    background-color: #2f2f2f;
  }
  .menu span {
    margin-left: 15px;
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
  .header-text {
    color: white;
    margin-top: 40px;
    margin-bottom: 25px;
    margin-left: 25px;
  }
  @media (max-width: 1024px) {
    width: ${(props) => props.open ? '100%' : '65px'};
    min-width: 65px;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    z-index: 4;
    .menu span {
      transition: all 0.2s ease-in-out;
      opacity: ${(props) => props.open ? 1 : 0};
      display: ${(props) => props.open ? 'flex' : 'none'};
    }
    .menu {
      padding: 0;
      justify-content: center;
      min-height: 50px;
      margin-top: 15px;
    }
    .menu:first-of-type {
      margin-top: 65px;
    }
    br {
      display: none;
    }
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
      padding: 0 15px;
      justify-content: center;
      align-items: center;
    }
    .line:nth-of-type(2) {
      transform: rotate(${(props) => props.open ? '-45deg' : 0});
      transition: all 0.2s ease-in-out;
    }
    .line:nth-of-type(1) {
      transform: translateY(${(props) => props.open ? '10px' : 0})
        rotate(${(props) => props.open ? '45deg' : 0});
      transform-origin: center;
      transition: all 0.2s ease-in-out;
    }
    .line:nth-of-type(3) {
      transform: translateY(${(props) => props.open ? '-10px' : 0})
        rotate(${(props) => props.open ? '-225deg' : 0});
      transform-origin: center;
      transition: all 0.2s ease-in-out;
    }
  }
`

const Logo = styled.div`
  height: 75px;
  background-color: white;
  align-items: center;
  margin: 25px;
  text-align: center;
  font-size: 35px;

  span {
    line-height: 75px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`

export { SideBar, Logo }
