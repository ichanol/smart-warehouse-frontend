import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row; 
`

const DateStart = styled.input`
  padding: 0;
  outline: 0;
  font-size: 16px;
  width: 100%;
  height: 40px;
  border: 0;
  border-bottom: 3px solid lightgray; 
  text-align: center; 
  color: #292A73;
  font-weight: bold;

  &&:focus {
    transition: 1s;
    border-bottom: 3px solid #ff9e1f;
  }
`

const DateEnd = styled.input`
  padding: 0;
  outline: 0;
  font-size: 16px;
  width: 100%;
  height: 40px;
  border: 0;
  border-bottom: 3px solid lightgray;
  text-align: center; 
  color: #292A73;
  font-weight: bold;

  &&:focus {
    transition: 0.5s;
    border-bottom: 3px solid #ff9e1f;
  }
`

export { Wrapper, DateStart, DateEnd }
