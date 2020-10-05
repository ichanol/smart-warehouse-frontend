import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: #e6eff0;
  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .header span {
    font-size: 22px;
  }
  .content {
    flex: 1;
    display: flex;
    background-color: white;
    padding: 25px;
    align-items: center;
  }
  .choice,
  .choice-disable {
    min-width: 250px;
    min-height: 75px;
    background-color: rgb(149, 249, 196);
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
  }
  .choice-disable {
    background-color: rgba(171, 206, 180, 0.25);
    color: gray;
    cursor: not-allowed;
  }
`
//rgb(104, 222, 191)
export { Container }
