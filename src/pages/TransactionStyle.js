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
`

const FilterBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;

  .filter {
    display: flex;
    flex-direction: row; 
    width: 100%;

    
  }
  .amount-wrap { 
    width: 20%; 
    padding: 0 20px;

    .amount {
      display: flex;
      flex-direction: row;
      position: relative; 

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      }

      .amount-start {
        position: absolute;
        top: 30%;
        left: 35%;
      }

      .amount-end {
        position: absolute;
        top: 30%;
        left: 85%;
      }

      .input-amount-min {
        border-right: 1px solid ${COLORS.gray[500]};
      }

      .input-amount-max {
        border-left: 1px solid ${COLORS.gray[500]};
      }
  }
  .action {
    display: flex; 
    flex-direction: column;
  }
  .button {
  display: flex;
  flex-direction: row;
  position: relative;
  top: 15px;
  }
  .search {
    display: flex;
    align-items: center;
    position: relative;
    width: 30%;
    height: 0%;
    

    .searchIcon {
      position: absolute;
      top: 30%;
      left: 90%;
    }
    
    .clearIcon {
      position: absolute;
      top: 30%;
      left: 80%;
    }
  }
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  outline: 0;
  border: 0;
  outline: 0;
  font-size: ${FONT.l};
`

export { Container, FilterBlock, Input }
