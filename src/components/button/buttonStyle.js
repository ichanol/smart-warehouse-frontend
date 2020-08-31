import styled from 'styled-components'

const CancelButton = styled.button`
    border: 0;
    margin: 20px;
    border-radius: 30px;
    outline: 0;
    width: 150px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #D5D5D5;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

    &:hover { 
      background-color: #C2C1C1;
      transition: 0.3s;
    }
    &:active {
      background-color: #D5D5D5;
    }
  `

const EditButton = styled.button`
    /* border: 0;
    border-radius: 30px;
    outline: 0;
    width: 60px;
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    background-color: #F7A400;
    cursor: pointer;
    text-decoration: none; */
    text-decoration: none;
    background-color: #F7A400;
    font-size: 14px;
    padding: 5px 15px;
    border: 0;
    border-radius: 30px;
    outline: 0;

    &:hover {
      background-color: #D58D00;
      transition: 0.3s;
    }
    &:active {
      background: #F7A400;
    }
  `

const SubmitButton = styled.button`
    border: 0;
    margin: 20px;
    border-radius: 30px;
    outline: 0;
    width: 150px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #5CB85C;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

    &:hover { 
      background-color: #2EA22E;
      transition: 0.3s;
    }
    &:active {
      background-color: #5CB85C;
    }
  `

const RetryButton = styled.button`
    border: 0;
    margin: 20px;
    border-radius: 30px;
    outline: 0;
    width: 150px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #F8FF3B;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

    &:hover { 
      background-color: #D6DC31;
      transition: 0.3s;
    }
    &:active {
      background-color: #F8FF3B;
    }
`

const ExportButton = styled.button`
    border: 0;
    margin: 20px;
    border-radius: 30px;
    outline: 0;
    width: 150px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #3A9EFD;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);

    &:hover { 
      background-color: #3082CF;
      transition: 0.3s;
    }
    &:active {
      background-color: #3A9EFD;
    }
`

export { CancelButton, RetryButton, EditButton, SubmitButton, ExportButton }
