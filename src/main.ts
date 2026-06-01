console.log("JS funcionando");
import "./style.css";

function createCinema(rows: number, seatsPerRow: number): number[][] {
  const cinema: number[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];

    for (let j = 0; j < seatsPerRow; j++) {
      row.push(0);
    }

    cinema.push(row);
  }

  return cinema;
}

const cinema = createCinema(8, 10);

function displayCinema(cinema: number[][]): void {
  for (let i = 0; i < cinema.length; i++) {
    let rowDisplay = "";

    for (let j = 0; j < cinema[i].length; j++) {
      if (cinema[i][j] === 0) {
        rowDisplay += "L ";
      } else {
        rowDisplay += "X ";
      }
    }

    console.log(rowDisplay);
  }
}

function reserveSeat(cinema: number[][], row: number, seat: number): void {
  if (row < 0 || row >= cinema.length || seat < 0 || seat >= cinema[0].length) {
    console.log("Asiento inválido");
    return;
  }

  if (cinema[row][seat] === 0) {
    cinema[row][seat] = 1;
    console.log("Asiento reservado");
  } else {
    console.log("Ese asiento ya está ocupado");
  }
}

function countAvailableSeats(cinema: number[][]): number {
  let count = 0;

  for (let i = 0; i < cinema.length; i++) {
    for (let j = 0; j < cinema[i].length; j++) {
      if (cinema[i][j] === 0) {
        count++;
      }
    }
  }

  return count;
}

// FUNCIÓN PRO
function reserveContiguousSeats(cinema: number[][], seatsNeeded: number): void {
  for (let i = 0; i < cinema.length; i++) {
    let consecutive = 0;

    for (let j = 0; j < cinema[i].length; j++) {
      if (cinema[i][j] === 0) {
        consecutive++;
      } else {
        consecutive = 0;
      }

      if (consecutive === seatsNeeded) {
        const startSeat = j - seatsNeeded + 1;

        for (let k = startSeat; k <= j; k++) {
          cinema[i][k] = 1;
        }

        console.log(
          `Reservados ${seatsNeeded} asientos en la fila ${i}, desde el asiento ${startSeat}`
        );
        return;
      }
    }
  }

  console.log("No hay suficientes asientos juntos disponibles");
}

// 🆕 INTERFAZ (NO rompe nada)
function renderCinema(cinema: number[][]): void {
  const grid = document.querySelector<HTMLDivElement>("#cinema-grid");
  const availableCount = document.querySelector<HTMLSpanElement>("#available-count");

  if (!grid || !availableCount) return;

  grid.innerHTML = "";

  for (let i = 0; i < cinema.length; i++) {
    for (let j = 0; j < cinema[i].length; j++) {
      const button = document.createElement("button");

      button.textContent = `${j + 1}`;
      button.className =
        "rounded-xl px-3 py-3 text-sm font-semibold transition focus:outline-none";

      if (cinema[i][j] === 0) {
        button.className += " bg-emerald-500 text-white hover:bg-emerald-600";
      } else {
        button.className += " bg-rose-600 text-white";
        button.disabled = true;
      }

      button.addEventListener("click", () => {
        reserveSeat(cinema, i, j);
        renderCinema(cinema);
      });

      grid.appendChild(button);
    }
  }

  availableCount.textContent = String(countAvailableSeats(cinema));
}

// 🚀 EJECUCIÓN

// Consola (para evaluación)
displayCinema(cinema);

reserveSeat(cinema, 0, 0);
reserveSeat(cinema, 0, 1);
reserveSeat(cinema, 2, 5);

displayCinema(cinema);

reserveContiguousSeats(cinema, 3);

displayCinema(cinema);

console.log("Asientos disponibles:", countAvailableSeats(cinema));

// 👇 INTERFAZ
renderCinema(cinema);