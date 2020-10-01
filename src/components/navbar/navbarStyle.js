import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Navigatebar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #FFF;
  text-decoration: none;
  width: 100%;
  height: 80px;
  border-radius: 0px 0px 30px 30px;

  .active {
    fill: #FFF;
    padding: 0px 10px;
    /* background-color: #292A73;
    color: #FFF;
    border-radius: 20px; */
    border-bottom: 5px solid #3E4491;
  }
  `

const Head = styled.div`
  display: flex;
  align-items: center;
  padding-left: 40px;
  flex: 0.4;
`

const Logo = styled(Link)`
  font-size: 30px;
  font-weight: 900;
  color: #292A73;
  text-decoration: none;
`

const Lists = styled.ul`
  display: flex;
  flex: 0.5;
  flex-direction: row;
  justify-content: space-around;
  list-style: none;
`

const LinkStyled = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

const List = styled.li`
  /* margin: 10px; */
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  padding: 0px 10px;
  border-bottom: 5px solid #FFF;
`

const TextMenu = styled.label`
  color: #292A73;
  padding: 0px 10px;
  cursor: pointer;

  &:hover {
    /* transition: 0.2s;
    border-bottom: 4px solid #292A73;
    border-radius: 3px; */
    /* border-bottom: 5px solid lightgray; */
    color: gray;
  }
`

export { Navigatebar, Head, Logo, Lists, LinkStyled, List, TextMenu }
