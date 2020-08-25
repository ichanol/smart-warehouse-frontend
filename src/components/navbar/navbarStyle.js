import styled from 'styled-components'

const Navigatebar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: lightcoral;
  text-decoration: none;
  height: 80px;
  width: 100%;
  border-radius: 0px 0px 30px 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 40px;
  flex: 0.46;
  font-size: 30px;
  font-weight: 900;
`

const Lists = styled.ul`
  display: flex;
  flex: 0.5;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
`

const Link = styled.a`
  text-decoration: none;

  &:hover {
    border-bottom: 4px solid #fff;
    border-radius: 3px;
  }
`

const List = styled.li`
  margin: 10px;
  font-size: 20px;
  color: black;
`

export { Navigatebar, Logo, Lists, Link, List }
