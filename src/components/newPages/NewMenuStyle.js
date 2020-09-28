import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #1c1c1c;
`

const SideBar = styled.div`
  min-width: 300px;
  background-color: #1c1c1c;

  .menu {
    padding: 15px 30px;
    width: 100%;
    height: 50px;
    color: rgba(255, 255, 255, 0.7);
    border-left: 5px solid transparent;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .menu:hover {
    color: white;
    border-color: white;
  }
  .menu:active {
  }
  span {
  }
`

const Logo = styled.div`
  height: 75px;
  background-color: white;
  align-items: center;
  margin: 25px;
`

const Content = styled.div`
  background-color: #ebecef;
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`

const Header = styled.div`
  height: 60px;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: row-reverse;

  .user-plate {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .profile-picture {
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background-color: #7be5d1;
  }
  span {
    margin-left: 5px;
  }
`

const DashBoard = styled.div`
  padding 25px;
  flex-direction: column;
  display: flex;
  flex:1;
  overflow: auto;

    .card {
        width: 275px;
        height: 250px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.3),
        0 -10px 10px 0 rgba(255, 255, 255, 0.35);
        margin: 20px;
        transition: all 0.25s ease-in-out ;
    }

    .card:hover {
        box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.3), 
        0 -5px 5px 0 rgba(255, 255, 255, 0.35);
        transform: scale(1.1);
    }

    div:nth-of-type(2) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    div > div:nth-of-type(3) {
        width: 550px;
        background-color: #7be5d1;
    }

    @media (max-width: 1024px) {
        div > div:nth-of-type(3) {
            width: 100%;
        }
    }
`

export { Container, SideBar, Content, Logo, DashBoard, Header }
