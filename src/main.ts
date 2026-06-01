console.log("Hello from src/main.ts");

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

        // 👇 Reservar automáticamente
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

// 🚀 EJECUCIÓN

displayCinema(cinema);

// Reservas previas
reserveSeat(cinema, 0, 0);
reserveSeat(cinema, 0, 1);
reserveSeat(cinema, 2, 5);

displayCinema(cinema);

//  PRO: reservar juntos automáticamente
reserveContiguousSeats(cinema, 3);

displayCinema(cinema);

console.log("Asientos disponibles:", countAvailableSeats(cinema));