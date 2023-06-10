let barata = [];
let objeto = [];

function mostrarBarato() {
  document.getElementById("namepc").innerHTML="";
  let min = Math.min(...barata);
  for (let i = 0; i < objeto.length; i++) {
    if (objeto[i].precio == min) {

      document.getElementById("namepc").append("id:  " +
      objeto[i]._id +" marca   :" +
      objeto[i].marca);
    }
  }
}
function validarDatos(id, codigo, marca, precio) {
  if (
    id.value == "" ||
    codigo.value == "" ||
    marca.value == "" ||
    precio.value == ""
  ) {
    alert("Se requiere completar todos los espacios");
    return false;
  } else return true;
}

function validarID(id) {
  if (id.value == "") {
    alert("Debe ingresar el id");
    return false;
  } else return true;
}
function limpiarCampos() {
  document.getElementById("id").value = "";
  document.getElementById("codigo").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("precio").value = "";
}

function post(id, codigo, marca, precio) {
  if (validarDatos(id, codigo, marca, precio)) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        limpiarCampos();
        get();
      }
    });
    xhr.open("POST", "http://127.0.0.1:3000/est");
    xhr.setRequestHeader("Content-Type", "application/json");
    let json = `{"_id":${id},"codigo":"${codigo}","marca":"${marca}","precio":${precio}}`;
    xhr.send(json);
  }
}

function put(id, codigo, marca, precio) {
  if (validarDatos(id, codigo, marca, precio)) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        limpiarCampos();
        get();
      }
    });
    xhr.open("PUT", "http://127.0.0.1:3000/est/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    let json = `{"_id":${id},"codigo":"${codigo}","marca":"${marca}","precio":${precio}}`;
    xhr.send(json);
  }
}

function deleteEst(id) {
  if (validarID(id)) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        limpiarCampos();
        get();
      }
    });
    xhr.open("DELETE", "http://127.0.0.1:3000/est/" + id);
    xhr.send();
  }
}

function get() {
  tabla = document.getElementById("response");
  tag = '<table id="Table">';
  tag += "</table>";
  tabla.innerHTML = tag;
  $("#Table").append(
    "<tr>" +
    '<th style="width: 80px">Id</th>' +
    '<th style="width: 180px">Codigo</th>' +
    '<th style="width: 380px">Marca</th>' +
    '<th style="width: 80px">Precio</th>'
  );
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      const respuesta = xhr.response;
      respuesta.forEach((e) => {
        barata.push(e.precio)
        objeto.push(e);
        $("#Table").append(
          "<tr>" +
          "<td>" +
          e._id +
          "</td>" +
          "<td>" +
          e.codigo +
          "</td>" +
          "<td>" +
          e.marca +
          "</td>" +
          "<td>" +
          e.precio +
          "</td>" +
          "</tr>"

        );
      }

      );
      $("#Table").append("</table>");
      mostrarBarato()
    } else {
      document.getElementById(
        "response"
      ).innerHTML = `Error: ${xhr.status}, el recurso no se ha encontrado.`;
    }
  });
  xhr.open("GET", "http://127.0.0.1:3000/est");
  xhr.responseType = "json";
  xhr.send();
}