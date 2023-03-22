import {useState, useEffect} from 'react';
import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffff8b;
  }
`

const buttonValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
// Calculator
// Screen
// ButtonBox
// Button
function App() {
  const [calc, setCalc] = useState({
    sign:"",
    number:0,
    result:0
  });

  useEffect(()=>{
    console.log("clicked!")
  },[calc]);

  const resetCalcResult = () => {
    setCalc({
      ...calc,
      sign: "",
      number: 0,
      result: 0
    })
  }

  const numberOnClick = (value) =>{
    setCalc({
      ...calc,
      number: calc.number === 0 && value ==="0" ? "0" 
              : calc.number % 1 === 0 ? String(calc.number + value) : String(calc.number) + value,
      result: !calc.sign ? 0 : calc.result,
    })
  }

  const signOnClick = (value) =>{
    setCalc({
      ...calc,
      sign: value,
      number:0,
      result: !calc.result && calc.number ? calc.number : calc.result,
    })
  }

  const equalsOnClick = () =>{
      if(calc.sign && calc.number){
        const mathResult = (firstValue, secondValue, sign) =>{
          return sign === "+" 
          ? firstValue + secondValue 
          : sign === "-" 
          ? firstValue - secondValue
          : sign === "X" 
          ? firstValue * secondValue 
          : firstValue / secondValue;
        }

        setCalc({
          ...calc,
          result: calc.number === "0" && calc.sign === "/"
          ? "Nie można dzielić przez zero !"
          : mathResult(Number(calc.result), Number(calc.number), calc.sign),
          sign: "",
          number: 0,
        })
      }
  }

  const inversionOnClick = () => {
    setCalc({
      ...calc,
      number: calc.number ? calc.number* -1: 0,
      result: calc.result ? calc.result* -1: 0,
      sign:""
    })
  }

  const percentageOnClick = () =>{
    setCalc({
      ...calc,
      number: calc.number  ? calc.number*0.01: 0
    })
  }

  const commaOnClick = (value) =>{
    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".") ? calc.number + value : calc.number
    })
  }

  const checkWhatWasClicked = (value) => {

    if(value === "+" || value === "-" || value === "/" || value === "X" ){
      signOnClick(value);
    } else {
      switch(value){
        case `C`:
          resetCalcResult();
          break;
        case `=`:
          equalsOnClick();
          break;
        case `+-`:
          inversionOnClick();
          break;
        case `%`:
          percentageOnClick();
          break;
        case `.`:
          commaOnClick(value);
          break;
        default: 
          numberOnClick(value);
      }
    }
  }
  
  return (
    <StyledApp>
      <Calculator>
        <Screen value={calc.number ? calc.number : calc.result}/>
        <ButtonBox>
          {
            buttonValues.flat().map((value,index)=>{
              return <Button key={index} value={value} onClick={() => checkWhatWasClicked(value)} />
            })
          }
        </ButtonBox>
      </Calculator>
      <GlobalStyle/>
    </StyledApp>
  );
}

const Calculator = ({children}) => {
  return <StyledCalculator className='calculator'>{children}</StyledCalculator>
}

const Screen = ({value}) => {
  return <StyledScreen className='screen'>{value}</StyledScreen>
}

const ButtonBox = ({children}) =>{
  return <StyledButtonBox>{children}</StyledButtonBox>
}

const Button = ({value,onClick}) =>{
  return <StyledButton className={value !== '='? value : 'equals'} onClick={onClick}>{value}</StyledButton>
}


const StyledButton = styled.button`
  border: none;
  margin: 2px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  outline: none;
  background-color: hsl(201, 100%, 28%);
  color: #ffff8b;

  &.equals{
    grid-column: 3 / 5;
    background-color: #ff4d43;
  }
  &.equals:hover{
    background-color: hsl(3, 100%, 53%);
    border-bottom: 3px solid  hsl(3, 100%, 63%);
    border-right: 3px solid  hsl(3, 100%, 63%);
  }

  &.equals:active{
    background-color: hsl(3, 100%, 43%);
    border: 2px solid hsl(3, 100%, 53%);
    color: hsla(60, 28%, 15%, 1);
  }
  
  &:hover{
  background-color: hsl(201, 100%, 23%);
  color: hsl(60, 100%, 80%);
  border-bottom: 3px solid  hsl(201, 100%, 18%);
  border-right: 3px solid  hsl(201, 100%, 18%);
  }

  &:active{
  background-color: hsla(193, 99%, 40%, 1);
  border: 2px solid hsla(193, 99%, 38%, 1);
  color: hsla(60, 28%, 15%, 1);
  }  
`;

const StyledButtonBox = styled.div`
  width: 100%;
  background-color: blue;
  height: calc(100% - 100px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
  background-color: hsl(191, 100%, 12%);
  border-radius: 5px;
`;

const StyledScreen = styled.span`
  height: 5rem;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 3rem;
  background-color: hsl(191, 100%, 11%);
  cursor: default;
`;

const StyledCalculator = styled.div`
  position: relative;
  margin: 5rem auto;
  width: 20rem;
  height: 25rem;
  padding: 10px;
  border-radius: 5px;
  background-color: #002730;
  box-shadow: 3px 5px 3px 5px;
`;

const StyledApp = styled.div`
  text-align: center;
`;



export default App;
