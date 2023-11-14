import { Personaje } from "./personaje.js";

class Monstruo extends Personaje {
  constructor(id, nombre, tipo, alias, defensa, miedo) {
    super(id, nombre, tipo);
    this.alias = alias;
    this.defensa = defensa;
    this.miedo = miedo;
  }
}

const tipos = ["vampiro", "zombie", "esqueleto", "fantasma", "bruja"];
const selectTipo = document.getElementById("frmTipo");

tipos.forEach((tipo) => {
  const opcion = document.createElement("option");
  opcion.value = tipo;
  opcion.text = tipo;
  selectTipo.add(opcion);
});

const mostrarSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

const ocultarSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

const setUpEventos = () => {
  const btnEditar = document.querySelectorAll(".btnEditar");

  btnEditar.forEach((btnEditar) => {
    btnEditar.addEventListener("click", (e) => {
      e.preventDefault();

      document.getElementById("btnSubmitEditar").style.visibility = "visible";
      document.getElementById("btnSubmitGuardar").style.visibility = "hidden";

      const monstruoId = e.target.dataset.monstruoId;
      const listaMonstruos =
        JSON.parse(localStorage.getItem("monstruos"))  || [];

      if (listaMonstruos == undefined) {
        listaMonstruos = [];
      }

      const monstruo = listaMonstruos.find(
        (monstruo) => monstruo.id == monstruoId
      );

      document.querySelector("#frmNombre").value = monstruo.nombre;
      document.querySelector("#frmTipo").value = monstruo.tipo;
      document.querySelector("#frmAlias").value = monstruo.alias;
      document.querySelector("#frmMiedo").value = monstruo.miedo;
      const defensa = document.querySelectorAll('input[name="frmDefensa"]');

      defensa.forEach((radio) => {
        if (radio.value == monstruo.defensa) {
          radio.checked = true;
        } else {
          radio.checked = false;
        }
      });
      const btnSubmitEditar = document.getElementById("btnSubmitEditar");
      btnSubmitEditar.dataset.monstruoId = monstruo.id;
    });
  });

  const btnEliminar = document.querySelectorAll(".btnEliminar");

  btnEliminar.forEach((btnEliminar) => {
    btnEliminar.addEventListener("click", (e) => {
      e.preventDefault();
      const monstruoId = e.target.dataset.monstruoId;

      let listaMonstruos = JSON.parse(localStorage.getItem("monstruos"))  || [];

      if (listaMonstruos == undefined) {
        listaMonstruos = [];
      }

      listaMonstruos = listaMonstruos.filter(
        (monstruo) => monstruo.id != monstruoId
      );

      localStorage.setItem("monstruos", JSON.stringify(listaMonstruos));

      crearTabla();
    });
  });
};

const crearTabla = () => {
  const monstruos = JSON.parse(localStorage.getItem("monstruos"))  || [];

  if (monstruos == undefined) {
    monstruos = [];
  }

  const tablaMonstruos = document.getElementById("tablaMonstruos");
  while (tablaMonstruos.rows.length > 1) {
    tablaMonstruos.deleteRow(1);
  }
  monstruos.forEach((monstruo) => {
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = monstruo.nombre;
    celdaNombre.id = "tdNombre";

    const celdaAlias = document.createElement("td");
    celdaAlias.textContent = monstruo.alias;
    celdaAlias.id = "tdAlias";

    const celdaDefensa = document.createElement("td");
    celdaDefensa.textContent = monstruo.defensa;
    celdaDefensa.defensa = "tdDefensa";

    const celdaMiedo = document.createElement("td");
    celdaMiedo.textContent = monstruo.miedo;
    celdaMiedo.miedo = "tdMiedo";

    const celdaTipo = document.createElement("td");
    celdaTipo.textContent = monstruo.tipo;
    celdaTipo.tipo = "tdTipo";

    const celdaEditar = document.createElement("td");
    celdaEditar.id = "tdEditar";
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.id = "btnEditar";
    btnEditar.classList.add("btnEditar");
    btnEditar.dataset.monstruoId = monstruo.id;
    celdaEditar.appendChild(btnEditar);

    const celdaEliminar = document.createElement("td");
    celdaEliminar.id = "tdEliminar";
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.id = "btnEliminar";
    btnEliminar.classList.add("btnEliminar");
    btnEliminar.dataset.monstruoId = monstruo.id;
    celdaEliminar.appendChild(btnEliminar);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaAlias);
    fila.appendChild(celdaDefensa);
    fila.appendChild(celdaMiedo);
    fila.appendChild(celdaTipo);
    fila.appendChild(celdaEditar);
    fila.appendChild(celdaEliminar);

    tablaMonstruos.appendChild(fila);
  });
  setUpEventos();
};

crearTabla();

const crearCards = () => {
  const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];

  if (monstruos == undefined) {
    monstruos = [];
  }
    const sectionCards = document.getElementById("cardsMonstruos");

  sectionCards.innerHTML = "";

  let titulo = document.createElement("h1");
  titulo.textContent = "Informacion Monstruos:";
  titulo.id = "tituloCards";
  sectionCards.appendChild(titulo);

  monstruos.forEach((monstruo) => {
    let articleCard = document.createElement("article");
    articleCard.id = "card";

    let divNombre = document.createElement("div");
    divNombre.id = "iconosCards";
    let nombre = document.createElement("p");
    nombre.textContent = monstruo.nombre;
    divNombre.appendChild(nombre);

    let divAlias = document.createElement("div");
    divAlias.id = "iconosCards";
    let alias = document.createElement("p");
    alias.textContent = monstruo.alias;
    let imgAlias = document.createElement("img");
    imgAlias.src = "./asserts/alias.png";
    divAlias.appendChild(imgAlias);
    divAlias.appendChild(alias);

    let divTipo = document.createElement("div");
    divTipo.id = "iconosCards";
    let tipo = document.createElement("p");
    tipo.textContent = monstruo.tipo;
    let imgTipo = document.createElement("img");
    imgTipo.src = "./asserts/fantasma.png";
    divTipo.appendChild(imgTipo);
    divTipo.appendChild(tipo);

    let divDefensa = document.createElement("div");
    divDefensa.id = "iconosCards";
    let defensa = document.createElement("p");
    defensa.textContent = monstruo.defensa;
    let imgDefensa = document.createElement("img");
    imgDefensa.src = "./asserts/defensa.png";
    divDefensa.appendChild(imgDefensa);
    divDefensa.appendChild(defensa);

    let divMiedo = document.createElement("div");
    divMiedo.id = "iconosCards";
    let miedo = document.createElement("p");
    miedo.textContent = monstruo.miedo;
    let imgMiedo = document.createElement("img");
    imgMiedo.src = "./asserts/miedo.png";
    divMiedo.appendChild(imgMiedo);
    divMiedo.appendChild(miedo);

    articleCard.appendChild(divNombre);
    articleCard.appendChild(divAlias);
    articleCard.appendChild(divTipo);
    articleCard.appendChild(divDefensa);
    articleCard.appendChild(divMiedo);
    sectionCards.appendChild(articleCard);
  });
};

const guardarMonstruo = (
  nombre,
  tipo,
  alias,
  defensa,
  miedo,
  listaMonstruos,
  callback
) => {
  mostrarSpinner();
  setTimeout(() => {
    let id = 1;

    if (listaMonstruos.length == 0) {
      localStorage.setItem("id", JSON.stringify(id));
    } else {
      id = parseInt(localStorage.getItem("id"));
      id++;
      localStorage.setItem("id", JSON.stringify(id));
    }

    let monstruo = new Monstruo(id, nombre, tipo, alias, defensa, miedo);

    listaMonstruos.push(monstruo);

    localStorage.setItem("monstruos", JSON.stringify(listaMonstruos));

    callback(listaMonstruos);

    ocultarSpinner();
    return listaMonstruos;
  }, 2000);
};

const editarMonstruo = (
  nombre,
  tipo,
  alias,
  defensa,
  miedo,
  listaMonstruos,
  callback
) => {
  mostrarSpinner();
  console.log("muestro spinner");
  setTimeout(() => {
    const monstruoId =
      document.getElementById("btnSubmitEditar").dataset.monstruoId;
    const indiceMonstruo = listaMonstruos.findIndex(
      (monstruo) => monstruo.id == monstruoId
    );
    let monstruo = new Monstruo(
      monstruoId,
      nombre,
      tipo,
      alias,
      defensa,
      miedo
    );

    listaMonstruos.splice(indiceMonstruo, 1, monstruo);

    document.getElementById("btnSubmitEditar").style.visibility = "hidden";
    document.getElementById("btnSubmitGuardar").style.visibility = "visible";

    localStorage.setItem("monstruos", JSON.stringify(listaMonstruos));

    callback(listaMonstruos);
    ocultarSpinner();
    console.log("oculto spinner");
    return listaMonstruos;
  }, 2000);
};

const formulario = document.querySelector("#formCargarMonstruo");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const btnSubmitGuardar = document.getElementById("btnSubmitGuardar");
  const btnSubmitEditar = document.getElementById("btnSubmitEditar");

  const nombre = document.querySelector("#frmNombre").value;
  const tipo = document.querySelector("#frmTipo").value;
  const alias = document.querySelector("#frmAlias").value;
  const defensa = document.querySelector(
    'input[name="frmDefensa"]:checked'
  ).value;
  const miedo = document.querySelector("#frmMiedo").value;

  let listaMonstruos = JSON.parse(localStorage.getItem("monstruos")) || [];

  if (listaMonstruos == undefined) {
    listaMonstruos = [];
  }

  if (e.submitter === btnSubmitGuardar) {
    listaMonstruos = guardarMonstruo(
      nombre,
      tipo,
      alias,
      defensa,
      miedo,
      listaMonstruos,
      crearTabla
    );
  } else if (e.submitter === btnSubmitEditar) {
    listaMonstruos = editarMonstruo(
      nombre,
      tipo,
      alias,
      defensa,
      miedo,
      listaMonstruos,
      crearTabla
    );
  }

  formulario.reset();
});

formulario.addEventListener("reset", (e) => {
  document.getElementById("btnSubmitEditar").style.visibility = "hidden";
  document.getElementById("btnSubmitGuardar").style.visibility = "visible";
});

const botonesMonstruos = document.querySelectorAll(".btnMonstruos");

botonesMonstruos.forEach((btnMonstruo) => {
  btnMonstruo.addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("formMonstruos").style.display = "none";
    document.getElementById("sectionTabla").style.display = "none";
    document.getElementById("tituloForm").style.display = "none";
    document.getElementById("cardsMonstruos").style.display = "block";

    crearCards();
  });
});

const botonesInicio = document.querySelectorAll(".btnInicio");

botonesInicio.forEach((btnInicio) => {
  btnInicio.addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("formMonstruos").style.display = "block";
    document.getElementById("sectionTabla").style.display = "block";
    document.getElementById("tituloForm").style.display = "block";
    document.getElementById("cardsMonstruos").style.display = "none";

    crearTabla();
  });
});

export { Monstruo };
