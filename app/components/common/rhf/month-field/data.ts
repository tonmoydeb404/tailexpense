export const months = [
  { month: "January", index: 1 },
  { month: "February", index: 2 },
  { month: "March", index: 3 },
  { month: "April", index: 4 },
  { month: "May", index: 5 },
  { month: "June", index: 6 },
  { month: "July", index: 7 },
  { month: "August", index: 8 },
  { month: "September", index: 9 },
  { month: "October", index: 10 },
  { month: "November", index: 11 },
  { month: "December", index: 12 },
];

export function* yearGenerator(startYear: number) {
  const currentYear = new Date().getFullYear();
  for (let year = startYear; year <= currentYear; year++) {
    yield year;
  }
}
