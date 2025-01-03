let displayValue = "0";
function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}
function appendNumber(value) {
  if (displayValue == "0" && displayValue != ".") {
    displayValue = value;
  } else {
    displayValue += value;
  }
  updateDisplay();
}
function setOperation(operator) {
  displayValue += operator;
  updateDisplay();
}
function calculate() {
  try {
    displayValue = eval(displayValue.replace("÷", "/").replace("x", "*"));
    displayValue = displayValue.toString();
  } catch {
    displayValue = "Error";
  }
  updateDisplay();
}
function clearDisplay() {
  displayValue = "0";
  updateDisplay();
}
