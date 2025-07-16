const materias = [
  { id: "mat1", nombre: "Matemática I", anio: 1, cuatri: 1, corrs: [] },
  { id: "fis1", nombre: "Física I", anio: 1, cuatri: 1, corrs: [] },
  { id: "qg", nombre: "Química General", anio: 1, cuatri: 1, corrs: [] },

  { id: "mat2", nombre: "Matemática II", anio: 1, cuatri: 2, corrs: ["mat1"] },
  { id: "fis2", nombre: "Física II", anio: 1, cuatri: 2, corrs: ["fis1", "mat1"] },
  { id: "qi", nombre: "Química Inorgánica", anio: 1, cuatri: 2, corrs: ["qg", "fis1"] },

  { id: "bio", nombre: "Biología", anio: 2, cuatri: 1, corrs: ["qg"] },
  { id: "qo1", nombre: "Química Orgánica I", anio: 2, cuatri: 1, corrs: ["qg", "qi"] },
  { id: "qa1", nombre: "Química Analítica I", anio: 2, cuatri: 1, corrs: ["qg", "qi"] },

  { id: "qo2", nombre: "Química Orgánica II", anio: 2, cuatri: 2, corrs: ["qi", "qo1"] },
  { id: "qa2", nombre: "Química Analítica II", anio: 2, cuatri: 2, corrs: ["qa1", "fis2"] },
  { id: "fisq", nombre: "Fisicoquímica", anio: 2, cuatri: 2, corrs: ["qa1", "fis2"] },

  { id: "bioest", nombre: "Bioestadística", anio: 3, cuatri: 1, corrs: ["mat2", "bio"] },
  { id: "qb1", nombre: "Química Biológica I", anio: 3, cuatri: 1, corrs: ["bio", "qo2", "qa2", "fisq"] },
  { id: "anat", nombre: "Anatomía Humana y Animales de Laboratorio", anio: 3, cuatri: 1, corrs: ["bio"] },
  { id: "ing", nombre: "Inglés Técnico", anio: 3, cuatri: 1, corrs: [] },

  { id: "fisiol", nombre: "Fisiología", anio: 3, cuatri: 2, corrs: ["qb1", "anat"] },
  { id: "qb2", nombre: "Química Biológica II", anio: 3, cuatri: 2, corrs: ["anat", "qb1"] },
  { id: "histo", nombre: "Histología y Elementos de Histopatología", anio: 3, cuatri: 2, corrs: ["anat"] },

  { id: "info", nombre: "Informática", anio: 4, cuatri: 1, corrs: [] },
  { id: "micro", nombre: "Microbiología General", anio: 4, cuatri: 1, corrs: ["qb1"] },
  { id: "inmub", nombre: "Inmunología Básica", anio: 4, cuatri: 1, corrs: ["fisiol", "qb2", "histo"] },

  { id: "cel", nombre: "Biología Celular", anio: 4, cuatri: 2, corrs: [] },
  { id: "farm", nombre: "Elementos de Farmacodinamia", anio: 4, cuatri: 2, corrs: ["fisiol"] },
  { id: "inmuc", nombre: "Inmunología Clínica", anio: 4, cuatri: 2, corrs: ["micro", "inmub"] },

  { id: "bc1", nombre: "Bioquímica Clínica I", anio: 5, cuatri: 1, corrs: ["cel", "inmub"] },
  { id: "bact", nombre: "Bacteriología", anio: 5, cuatri: 1, corrs: ["inmub", "farm"] },
  { id: "broma", nombre: "Bromatología", anio: 5, cuatri: 1, corrs: ["micro"] },

  { id: "bc2", nombre: "Bioquímica Clínica II", anio: 5, cuatri: 2, corrs: ["bc1"] },
  { id: "viro", nombre: "Virología", anio: 5, cuatri: 2, corrs: ["micro", "inmuc"] },
  { id: "mico", nombre: "Micología", anio: 5, cuatri: 2, corrs: ["inmuc", "bact"] },

  { id: "bc3", nombre: "Bioquímica Clínica III", anio: 6, cuatri: 1, corrs: ["bc2"] },
  { id: "paras", nombre: "Parasitología", anio: 6, cuatri: 1, corrs: ["inmuc"] },
  { id: "toxi", nombre: "Toxicología", anio: 6, cuatri: 1, corrs: ["qb2", "farm", "bc1"] },
  { id: "epis", nombre: "Epistemología e Investigación Científica", anio: 6, cuatri: 1, corrs: [] },
  { id: "pp", nombre: "Práctica Profesional", anio: 6, cuatri: 2, corrs: ["bc2", "bc3"] },
];

let estado = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");

function puedeCursarse(m) {
  return m.corrs.every(id => estado[id] === "aprobada");
}

function crearMalla() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";
  for (let año = 1; año <= 6; año++) {
    for (let cuatr = 1; cuatr <= 2; cuatr++) {
      const lista = materias.filter(m => m.anio === año && m.cuatri === cuatr);
      if (!lista.length) continue;
      const sec = document.createElement("div");
      sec.className = "seccion";
      const titulo = document.createElement("h3");
      titulo.innerText = `${año}° Año – ${cuatr}° Cuatrimestre`;
      sec.appendChild(titulo);
      const gri = document.createElement("div");
      gri.className = "grilla";
      lista.forEach(m => {
        const btn = document.createElement("div");
        btn.className = "materia";
        btn.innerText = m.nombre;
        btn.dataset.id = m.id;
        if (estado[m.id] === "aprobada") btn.classList.add("aprobada");
        else if (estado[m.id] === "regularizada") btn.classList.add("regularizada");
        if (!puedeCursarse(m)) btn.style.opacity = "0.4";
        btn.onclick = () => {
          if (!puedeCursarse(m)) return;
          if (!estado[m.id]) estado[m.id] = "regularizada";
          else if (estado[m.id] === "regularizada") estado[m.id] = "aprobada";
          else delete estado[m.id];
          localStorage.setItem("estadoMaterias", JSON.stringify(estado));
          crearMalla();
        };
        gri.appendChild(btn);
      });
      sec.appendChild(gri);
      cont.appendChild(sec);
    }
  }
}

crearMalla();
