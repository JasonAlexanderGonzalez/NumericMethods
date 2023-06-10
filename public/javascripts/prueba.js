function solucion() {
  // Obtén el valor de la ecuación ingresada por el usuario
  const equation = document.getElementById('ecuacion').value.trim();

  // Resuelve la ecuación cuadrática utilizando Nerdamer
  const solutions = nerdamer.solve(equation, 'x');

  // Mostrar las soluciones en el elemento de salida
  const outputElement = document.getElementById('solutionsOutput');
  outputElement.innerHTML = 'Soluciones: ' + solutions.join(', ');
}