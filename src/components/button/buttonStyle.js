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
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    margin: 0 20px;
    border-radius: 30px;
    outline: 0;
    width: 100px;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    border: 5px solid #2EA22E;
    color: #2EA22E;

    &:hover { 
      background-color: #2EA22E;
      transition: 0.3s;
      color: #FFFFFF;
    }
    &:active {
      background-color: #5CB85C;
    }

    .submit {
    color: blue;
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

    &:hover { 
      background-color: #D6DC31;
      transition: 0.3s;
    }
    &:active {
      background-color: #F8FF3B;
    }
`

const ExportButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;
    margin: 20px;
    border-radius: 30px;
    outline: 0;
    width: 200px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    background-color: #3082CF;

    &:hover { 
      background-color: #3A9EFD;
      transition: 0.3s;
    }
    &:active {
      background-color: #3082CF;
    }
`

const DeleteButton = styled.button`
    text-decoration: none;
    background-color: #d9534f;
    font-size: 14px;
    padding: 5px 15px;
    border: 0;
    border-radius: 30px;
    outline: 0;

    &:hover {
      background-color: #bc4543;
      transition: 0.3s;
    }
    &:active {
      background: #d9534f;
    }
`

const ClearButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 30px;
    outline: 0;
    width: 100px;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    border: 5px solid #5A6268;
    fill: #5A6268;

    &:hover { 
      background-color: #5A6268;
      transition: 0.3s;
      fill: #FFFFFF;
    }
    &:active {
      background-color: #FFFFFF;
    }
  `

const TextButton = styled.label`
  padding: 0px 10px;
  color: #FFF;

  &.clear {
    color: black;
  }
`

const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  margin: 0 20px;
  border-radius: 30px;
  outline: 0;
  width: 100px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  border: 5px solid #28A745;
  fill: #28A745;

  &:hover { 
    background-color: #28A745;
    transition: 0.3s;
    fill: #FFFFFF;  
  }
  &:active {
    background-color: #5CB85C;
  }

  .submit {
  color: blue;
  }
`

export { CancelButton, RetryButton, EditButton, SubmitButton, ExportButton, DeleteButton, ClearButton, FilterButton, TextButton }
