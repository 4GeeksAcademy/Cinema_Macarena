/**
 * Initializes a cinema seating matrix
 * @returns A 2D array representing cinema seats (8 rows × 10 seats)
 * where 0 = available, 1 = reserved
 */
export function initializeCinemaSeating(): number[][] {
  const rows = 8;
  const seatsPerRow = 10;

  return Array(rows)
    .fill(null)
    .map(() => Array(seatsPerRow).fill(0));
}
