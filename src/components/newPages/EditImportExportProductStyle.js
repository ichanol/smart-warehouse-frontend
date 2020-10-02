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
  }
  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;;
  }
  .cancle-button-wrapper{
    margin-left: 20px;
  }
  .title,
  .value,
  input {
    width: 100%;
    display: flex;
    height: 45px;
    align-items: center;
  }
  .value {
    background-color: rgba(171, 206, 180, 0.25);
    padding-left: 15px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    cursor: not-allowed;
    margin-bottom: 15px;
  }
  input {
    border-radius: 5px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    margin-bottom: 15px;
    padding-left: 15px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    padding-right: 10px;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
    border-radius: 5px;
    background-color: white;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    margin-bottom: 35px;
  }
`

export { Container }
