// Definir la función
function miFuncion(x) {
    return Math.pow(x, 3) + Math.pow(x, 2) - 3 * x-5;
  }
  
  // Función para encontrar el valor real de x
  function encontrarXReal(funcion, limiteInferior, limiteSuperior, precision) {
    // Inicializar los límites de búsqueda
    let a = limiteInferior;
    let b = limiteSuperior;
  
    // Iterar hasta alcanzar la precisión deseada
    while (Math.abs(b - a) > precision) {
      let c = (a + b) / 2; // Calcular el punto medio
  
      if (funcion(c) === 0) {
        return c; // Encontrado el valor real de x
      } else if (funcion(a) * funcion(c) < 0) {
        b = c; // Mover el límite superior
      } else {
        a = c; // Mover el límite inferior
      }
    }
  
    return (a + b) / 2; // Valor aproximado de x
  }
  
  // Llamar a la función para encontrar el valor real de x
  const xReal = encontrarXReal(miFuncion, -10, 10, 0.0001);
  console.log("El valor real de x es:", xReal);
  