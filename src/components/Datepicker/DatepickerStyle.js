import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const DateStart = styled.input`
  margin-right: 0px;
  padding-left: 10px;
  font-size: 20px;
  height: 40px;
  border: 0;
  outline: 0;
  /* border-radius: 30px 0px 0px 30px;   */
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

const DateEnd = styled.input`
  margin-left: 0px;
  padding-left: 10px;
  font-size: 20px;
  height: 40px;
  border: 0;
  outline: 0;
  /* border-radius: 0px 30px 30px 0px; */
  border-left: 1px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`

export { Wrapper, DateStart, DateEnd }
