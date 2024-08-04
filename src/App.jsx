import React from "react";

export default function App() {
    const [calcData, setCalcData] = React.useState("0");
	const [input, setInputType] = React.useState();

	const clearAll = () => {
		setCalcData("0");
	};

	const handleNumber = (number) => {
		if (calcData === "0") {
			setCalcData(number.toString());
			setInputType("number");
		} else {
			setCalcData(calcData + number.toString());
			setInputType("number");
		}
	};

	const handleDecimal = () => {
		const tempArray = calcData.split(" ");
		if (!tempArray[tempArray.length - 1].includes(".")) {
			tempArray[tempArray.length - 1] += ".";
			setInputType("decimal");
			setCalcData(tempArray.join(" "));
		}
	};

	const handleOperator = (operator) => {
		console.log(input);
		setInputType("operator");
		if (input !== "operator") {
			setCalcData(calcData + " " + operator + " ");
		} else {
			const tempArray = calcData.split(" ");
			if (tempArray[tempArray.length - 2] === "-" && operator === "-") {
				tempArray[tempArray.length - 2] = "+";
			} else if (
				(tempArray[tempArray.length - 2] === "*" && operator === "-") ||
				(tempArray[tempArray.length - 2] === "/" && operator === "-")
			) {
				tempArray.push("-");
			} else if (
				(tempArray[tempArray.length - 3] === "*" && operator !== "-") ||
				(tempArray[tempArray.length - 3] === "/" && operator !== "-")
			) {
				tempArray.pop();
				tempArray.pop();
				tempArray.pop();
				tempArray.push(operator);
			} else {
				tempArray[tempArray.length - 2] = operator;
			}
			setCalcData(tempArray.join(" "));
		}
	};

	const evaluateEquation = async () => {
		try {
			const result = await eval(calcData);
			setCalcData(result);
		} catch (error) {
			setCalcData("ERROR");
		}
	};

    return (
        <main className="calculator">
            <div className="calculator--display" id="display">{calcData}</div>
            <div className="calculator--buttons">
                <button id="clear" value="AC" onClick={clearAll}>AC</button>
                <button id="divide" value="/" onClick={() => handleOperator("/")}>/</button>
                <button id="multiply" value="*" onClick={() => handleOperator("*")}>*</button>
                <button id="seven" value="7" onClick={() => handleNumber(7)}>7</button>
                <button id="eight" value="8" onClick={() => handleNumber(8)}>8</button>
                <button id="nine" value="9" onClick={() => handleNumber(9)}>9</button>
                <button id="subtract" value="-" onClick={() => handleOperator("-")}>-</button>
                <button id="four" value="4" onClick={() => handleNumber(4)}>4</button>
                <button id="five" value="5" onClick={() => handleNumber(5)}>5</button>
                <button id="six" value="6" onClick={() => handleNumber(6)}>6</button>
                <button id="add" value="+" onClick={() => handleOperator("+")}>+</button>
                <button id="one" value="1" onClick={() => handleNumber(1)}>1</button>
                <button id="two" value="2" onClick={() => handleNumber(2)}>2</button>
                <button id="three" value="3" onClick={() => handleNumber(3)}>3</button>
                <button id="equals" value="=" onClick={evaluateEquation}>=</button>
                <button id="zero" value="0" onClick={() => handleNumber(0)}>0</button>
                <button id="decimal" value="." onClick={handleDecimal}>.</button>
            </div>
        </main>
    )
}