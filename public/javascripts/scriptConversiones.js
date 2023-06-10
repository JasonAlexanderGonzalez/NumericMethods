function solveBisection() {
  var equation = document.getElementById("equation").value;
  var a = parseFloat(document.getElementById("intervaloA").value);
  var b = parseFloat(document.getElementById("intervaloB").value);
  //
  var xReal = parseFloat(document.getElementById("xReal").value.replace(",", "."));
  // var xReal = parseFloat(document.getElementById("xReal").value);

  var error = parseFloat(document.getElementById("error").value);
  var maxIterations = parseInt(document.getElementById("iteraciones").value);
  var resultDiv = document.getElementById("result");

  var table = document.createElement("table");
  table.innerHTML =
    "<tr><th>Iteración</th><th>a</th><th>b</th><th>c</th><th>f(a)</th><th>f(b)</th><th>f(c)</th><th>f(b)*f(c)</th><th>Error Est.</th><th>Error Abs.</th><th>Error Rel.</th></tr>";
  resultDiv.appendChild(table);

  var fa, fb, fc, fbc, errorEst, errorAbs, errorRel;
  var previousC; // Variable para almacenar el valor anterior de c

  // Calcular el valor de xRealValue una vez antes del bucle
  var xRealValue = evaluateEquation(equation, xReal);

  for (var i = 1; i <= maxIterations; i++) {
    var c = (a + b) / 2;
    fa = evaluateEquation(equation, a);
    fb = evaluateEquation(equation, b);
    fc = evaluateEquation(equation, c);
    fbc = fb * fc;
    errorEst = i > 1 ? Math.abs(c - previousC) / c : null; // Calcular error estimado a partir de la segunda iteración
    // Utilizar el valor constante de xRealValue en el cálculo del error absoluto
    errorAbs = Math.abs(c - xReal);

    errorRel = errorAbs / xReal;
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      i +
      "</td>" +
      "<td>" +
      a +
      "</td>" +
      "<td>" +
      b +
      "</td>" +
      "<td>" +
      c +
      "</td>" +
      "<td>" +
      fa +
      "</td>" +
      "<td>" +
      fb +
      "</td>" +
      "<td>" +
      fc +
      "</td>" +
      "<td>" +
      fbc +
      "</td>" +
      "<td>" +
      (errorEst !== null ? errorEst : "") +
      "</td>" +
      "<td>" +
      errorAbs +
      "</td>" +
      "<td>" +
      errorRel +
      "" +
      "</td>";
    table.appendChild(row);

    if (fbc === 0 || (errorEst !== null && errorEst < error)) {
      break;
    }

    if (fbc < 0) {
      a = c;
    } else {
      b = c;
    }

    previousC = c; // Actualizar el valor anterior de c
  }

  if (i > maxIterations) {
    alert(
      "El método de bisección no convergió después de " +
        maxIterations +
        " iteraciones. Por favor, revise su ecuación o elija un error más grande."
    );
  }
}

// Resto del código...

function evaluateEquation(equation, x) {
  try {
    var result = math.evaluate(equation, { x: x });
    return result;
  } catch (error) {
    console.error("Error al evaluar la ecuación:", error);
    return NaN; // Valor NaN si ocurre un error en la evaluación
  }
}
