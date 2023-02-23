import './App.css';
import {useState} from 'react';

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
    <div className="App">
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
    </div>
  );
}

const Calculator = ({children}) => {
  return <div>{children}</div>
}

const Screen = ({value}) => {
  return <span>{value}</span>
}

const ButtonBox = ({children}) =>{
  return <div>{children}</div>
}

const Button = ({value,onClick}) =>{
  return <button onClick={onClick}>{value}</button>
}



export default App;
