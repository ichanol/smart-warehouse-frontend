import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row; 
`

const DateStart = styled.input`
  padding: 0;
  outline: 0;
  font-size: 20px;
  width: 80%;
  height: 40px;
  border: 3px solid lightgray; 
  text-align: center; 
  color: #292A73;
  font-weight: bold;

  &&:focus {
    transition: 1s;
    border: 3px solid #292A73;
  }
`

const DateEnd = styled.input`
  padding: 0;
  outline: 0;
  font-size: 20px;
  width: 80%;
  height: 40px;
  border: 3px solid lightgray;
  text-align: center; 
  color: #292A73;
  font-weight: bold;

  &&:focus {
    transition: 1s;
    border: 3px solid #292A73;
  }
`

export { Wrapper, DateStart, DateEnd }
