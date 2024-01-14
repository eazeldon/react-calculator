import "./App.css";
import { useState, useEffect } from 'react';
import NumberFormat from "react-number-format";






function App() {

const [preState, setPreState] = useState("");
const [calcState, setCalcState] = useState("");
const [input, setInput] = useState("0");
const [operator, setOperator] = useState(null);
const [total, setTotal] = useState(false);//boolean

 //time
 const [clockState, setClockState] = useState();

 //'*********** add
 
//*******  Number 
// only one dot
const inputNum = (e) => {
   if(calcState.includes(".") && e.target.innerText === ".")return;

   if (total) {
      setPreState("");
    }

    calcState
      ? setCalcState((pre) => pre + e.target.innerText)
      : setCalcState(e.target.innerText);
    setTotal(false);
  
};
useEffect(() => {
   setInput(calcState)
    
},[calcState]);

useEffect(() => {
   setInput("0");
 }, []);

//*******  + - x / = 
const operatorType = (e) => {
   setTotal(false)
   setOperator(e.target.innerText)
   if (calcState === "") return
   if(preState !== "") {
      equals();
   } else {
      setPreState(calcState);
      setCalcState("");

   }
  
};

//************* Equals
const equals = (e) => {
   if (e?.target.innerText === "=") {
      setTotal(true);

};


let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(calcState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(calcState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(calcState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(calcState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCalcState("");
  };



//********** +/-
const minusPlus = () => {
   if (calcState.charAt(0) === "-") {
      setCalcState(calcState.substring(1));
    } else {
      setCalcState("-" + calcState);
    }

}

const percent = () => {

   preState
      ?  setCalcState(String((parseFloat(calcState) / 100) * preState))
      :  setCalcState(String(parseFloat(calcState) / 100));
}


   const reset = () => {
      setPreState("");
      setCalcState("");
      setInput("0");
    

};


/////************ time
useEffect(() => {
   setInterval(() => {
     const date = new Date();
     setClockState(date.toLocaleTimeString());
   }, 1000);
 }, []);
  
 ///************** back space
 const backSpace = () => {
  
  
   if (calcState.length > 0) {
      setCalcState(calcState => calcState.slice(0, -1));
   }
 }



   return (
      <div className="container">
       
          
          {/* Time */}    
         
          <div className="clock"><i className="fa-solid fa-clock"></i> {clockState}</div>
        

       
         
         <div className="inside-cal">
          <div className="screen">{input !== "" || input === "0" ? (
              <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
            ) : (
               <NumberFormat
                 value={preState}
                 displayType={"text"}
                 thousandSeparator={true}
               />
          )}
          </div> 
            <div className="btn light-gray" onClick={reset}>AC</div>
            <div className="btn light-gray" onClick={backSpace}><i className="fa-solid fa-rotate-left"></i></div>
            <div className="btn light-gray fix" onClick={percent}>%</div>
            <div className="btn light-gray" onClick={minusPlus}>+/-</div>
            <div className="btn orange" onClick={operatorType}>/</div>
            <div className="btn" onClick={inputNum}>7</div>
            <div className="btn fix" onClick={inputNum}>8</div>
            <div className="btn" onClick={inputNum}>9</div>
            <div className="btn orange" onClick={operatorType}>X</div>
            <div className="btn" onClick={inputNum}>4</div>
            <div className="btn fix" onClick={inputNum}>5</div>
            <div className="btn" onClick={inputNum}>6</div>
            <div className="btn orange" onClick={operatorType}>+</div>
            <div className="btn" onClick={inputNum}>1</div>
            <div className="btn fix" onClick={inputNum}>2</div>
            <div className="btn" onClick={inputNum}>3</div>
            <div className="btn orange" onClick={operatorType}>-</div>
            <div className="btn zero" onClick={inputNum}>0</div>
            <div className="btn fix" onClick={inputNum}>.</div>
            <div className="btn" onClick={equals}>=</div>
            
            <br/>
           <p className="text">E-D-F</p>
           <p className="text">React.js</p>
         </div>
         
      </div>
       
    
   ) 
   
  
}



export default App;
