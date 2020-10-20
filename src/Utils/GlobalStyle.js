import { COLORS } from '../Constant'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Kanit', sans-serif;
  }

  .app {
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    display: flex;
  }

  .wrapper {
    flex: 1;
    display: flex;
  }

  .app-content {
    padding-left: 275px;
    display: flex;
    width: 100vw;
    flex-direction: column;
    position: relative;
    max-height: 100vh;
  }
  
  @media only screen and (max-width: 1024px) {
    .app-content {
      padding-left: 65px;
    }
  }
  
  button {
    border: none;
    outline: none;
    cursor: pointer;
  }
`

export default GlobalStyle
