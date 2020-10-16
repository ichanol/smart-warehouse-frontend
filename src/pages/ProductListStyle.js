import { COLORS, FONT } from '../Constant'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.gray[200]};

  .header {
    height: 100px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .header span {
    font-size: ${FONT.xl};
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.natural.white};
    padding: 0px;
    min-width: 100%;
    overflow: auto;
    filter: blur(${({ blur }) => blur ? 10 : 0}px);
    position: relative;  
  }

  .filter {
    display: flex;
    flex-direction: row;
    padding: 20px 0;
  }

  .search { 
    display: flex;
    align-items: center;
    position: relative;
    width: 30%;
    padding-right: 20px;

    .search-icon {
      position: absolute;
      left: 85%;
    }

    .clear-icon {
      position: absolute;
      left: 75%;
    }
  }
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  outline: 0;
  border: 0;
  border-bottom: 3px solid ${COLORS.gray[500]};
  outline: 0;
  font-size: ${FONT.l};

  &&:focus {
    transition: 1s;
    border-bottom: 3px solid ${COLORS.orange[500]};
  } 
`

export { Container, Input }
