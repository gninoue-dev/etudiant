function appendValue(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculate() {
  try {
    document.getElementById('display').value = eval(document.getElementById('display').value);
  } catch {
    document.getElementById('display').value = 'Erreur';
  }
  const display = document.getElementById('display');
  const expression = display.value;

  if ( expression === "0/0"){
    display.value = "vous etes con veillez retouner en CM1";
    return;
  }

  try{
    display.value = eval(expression);
  }
  catch{
    display.value = "CON"
  }
}
