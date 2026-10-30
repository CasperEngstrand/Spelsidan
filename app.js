// Data: minst 6 saker, varje med namn, kategori och bild
const spel = [
  { namn: "Call of Duty", kategori: "FPS", bild: "bilder/call-of-duty.jpg" },
  { namn: "Counter-Strike 2", kategori: "FPS", bild: "bilder/counter-strike-2.jpg" },
  { namn: "The Witcher 3", kategori: "RPG", bild: "bilder/witcher-3.jpg" },
  { namn: "Skyrim", kategori: "RPG", bild: "bilder/skyrim.jpg" },
  { namn: "FC 26", kategori: "Sport", bild: "bilder/fc-26.jpg" },
  { namn: "NBA 2K26", kategori: "Sport", bild: "bilder/nba-2k26.jpg" }
];

const ALLA = "Alla";
let valdKategori = ALLA;
let sokText = "";

const filterEl = document.getElementById("filter");
const listaEl = document.getElementById("lista");
const tomtEl = document.getElementById("tomt");
const antalEl = document.getElementById("antal");
const sokEl = document.getElementById("sok");

// Kategorier tas fram ur arrayen, så nya spel ger nya knappar automatiskt
function hamtaKategorier() {
  return [ALLA, ...new Set(spel.map(s => s.kategori))];
}

function ritaFilter() {
  filterEl.innerHTML = "";
  hamtaKategorier().forEach(kategori => {
    const knapp = document.createElement("button");
    knapp.type = "button";
    knapp.textContent = kategori;
    knapp.setAttribute("aria-pressed", String(kategori === valdKategori));
    knapp.addEventListener("click", () => {
      valdKategori = kategori;
      ritaFilter();
      ritaLista();
    });
    filterEl.appendChild(knapp);
  });
}

function ritaLista() {
  // Filtrera en kopia – originalarrayen ändras aldrig
  let resultat = [...spel];

  if (valdKategori !== ALLA) {
    resultat = resultat.filter(s => s.kategori === valdKategori);
  }
  const q = sokText.trim().toLowerCase();
  if (q) {
    resultat = resultat.filter(s => s.namn.toLowerCase().includes(q));
  }

  listaEl.innerHTML = "";
  resultat.forEach(s => {
    const li = document.createElement("li");
    li.className = "kort";
    li.dataset.kategori = s.kategori;

    const bild = document.createElement("img");
    bild.src = s.bild;
    bild.alt = `Illustration för ${s.namn}`;
    bild.loading = "lazy";

    const rubrik = document.createElement("h2");
    rubrik.textContent = s.namn;

    const kat = document.createElement("p");
    kat.className = "kategori";
    kat.textContent = s.kategori;

    li.append(bild, rubrik, kat);
    listaEl.appendChild(li);
  });

  if (resultat.length === 0) {
    const delar = [];
    if (valdKategori !== ALLA) delar.push(`kategorin ${valdKategori}`);
    if (q) delar.push(`sökningen “${sokText.trim()}”`);
    tomtEl.textContent = `Inga spel matchar ${delar.join(" och ")}. Välj Alla eller ändra sökningen.`;
    tomtEl.hidden = false;
    antalEl.textContent = "";
  } else {
    tomtEl.hidden = true;
    antalEl.textContent = `Visar ${resultat.length} av ${spel.length} spel`;
  }
}

sokEl.addEventListener("input", () => {
  sokText = sokEl.value;
  ritaLista();
});

// Rita när sidan öppnas
ritaFilter();
ritaLista();