export interface IBudget {
  _id: string; // (unique)
  month: string; // (ISO) (unique)
  amount: number; // (store in lowest grade)
}
