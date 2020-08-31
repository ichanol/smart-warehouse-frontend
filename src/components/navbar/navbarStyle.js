import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Navigatebar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #FFF;
  text-decoration: none;
  height: 80px;
  border-radius: 0px 0px 30px 30px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  `

const Head = styled.div`
  display: flex;
  align-items: center;
  padding-left: 40px;
  flex: 0.46;
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
  justify-content: space-between;
  list-style: none;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    border-bottom: 4px solid #292A73;
    border-radius: 3px;
  }
`

const List = styled.li`
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #292A73;
  text-decoration: none;
`



export { Navigatebar, Head, Logo, Lists, LinkStyled, List }
