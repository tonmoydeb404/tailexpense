import type {
  IBudgetReport,
  ICategoryReport,
  IExpenseReport,
} from "~/types/report";

export const categoryReports: ICategoryReport[] = [
  { category: "cat_0002", amount: 1200.0 },
  { category: "cat_0001", amount: 250.75 },
  { category: "cat_0003", amount: 150.5 },
  { category: "cat_0004", amount: 100.25 },
  { category: "cat_0005", amount: 60.0 },
  { category: "cat_0006", amount: 500.0 },
  { category: "cat_0007", amount: 200.0 },
  { category: "cat_0008", amount: 80.0 },
  { category: "cat_0009", amount: 300.0 },
  { category: "cat_0010", amount: 50.0 },
];

export const budgetReports: IBudgetReport[] = [
  { month: "January", budget: 186, expense: 80 },
  { month: "February", budget: 305, expense: 200 },
  { month: "March", budget: 237, expense: 120 },
  { month: "April", budget: 73, expense: 190 },
  { month: "May", budget: 209, expense: 130 },
  { month: "June", budget: 214, expense: 140 },
  { month: "July", budget: 186, expense: 80 },
  { month: "August", budget: 305, expense: 200 },
  { month: "September", budget: 237, expense: 120 },
  { month: "October", budget: 73, expense: 190 },
  { month: "November", budget: 209, expense: 130 },
  { month: "December", budget: 214, expense: 140 },
];

export const expenseReports: IExpenseReport[] = [
  { _id: "1", date: "2024-04-01T00:00:00.000Z", amount: 222 },
  { _id: "2", date: "2024-04-02T00:00:00.000Z", amount: 97 },
  { _id: "3", date: "2024-04-03T00:00:00.000Z", amount: 167 },
  { _id: "4", date: "2024-04-04T00:00:00.000Z", amount: 242 },
  { _id: "5", date: "2024-04-05T00:00:00.000Z", amount: 373 },
  { _id: "6", date: "2024-04-06T00:00:00.000Z", amount: 301 },
  { _id: "7", date: "2024-04-07T00:00:00.000Z", amount: 245 },
  { _id: "8", date: "2024-04-08T00:00:00.000Z", amount: 409 },
  { _id: "9", date: "2024-04-09T00:00:00.000Z", amount: 59 },
  { _id: "10", date: "2024-04-10T00:00:00.000Z", amount: 261 },
  { _id: "11", date: "2024-04-11T00:00:00.000Z", amount: 327 },
  { _id: "12", date: "2024-04-12T00:00:00.000Z", amount: 292 },
  { _id: "13", date: "2024-04-13T00:00:00.000Z", amount: 342 },
  { _id: "14", date: "2024-04-14T00:00:00.000Z", amount: 137 },
  { _id: "15", date: "2024-04-15T00:00:00.000Z", amount: 120 },
  { _id: "16", date: "2024-04-16T00:00:00.000Z", amount: 138 },
  { _id: "17", date: "2024-04-17T00:00:00.000Z", amount: 446 },
  { _id: "18", date: "2024-04-18T00:00:00.000Z", amount: 364 },
  { _id: "19", date: "2024-04-19T00:00:00.000Z", amount: 243 },
  { _id: "20", date: "2024-04-20T00:00:00.000Z", amount: 89 },
  { _id: "21", date: "2024-04-21T00:00:00.000Z", amount: 137 },
  { _id: "22", date: "2024-04-22T00:00:00.000Z", amount: 224 },
  { _id: "23", date: "2024-04-23T00:00:00.000Z", amount: 138 },
  { _id: "24", date: "2024-04-24T00:00:00.000Z", amount: 387 },
  { _id: "25", date: "2024-04-25T00:00:00.000Z", amount: 215 },
  { _id: "26", date: "2024-04-26T00:00:00.000Z", amount: 75 },
  { _id: "27", date: "2024-04-27T00:00:00.000Z", amount: 383 },
  { _id: "28", date: "2024-04-28T00:00:00.000Z", amount: 122 },
  { _id: "29", date: "2024-04-29T00:00:00.000Z", amount: 315 },
  { _id: "30", date: "2024-04-30T00:00:00.000Z", amount: 454 },
  { _id: "31", date: "2024-05-01T00:00:00.000Z", amount: 165 },
  { _id: "32", date: "2024-05-02T00:00:00.000Z", amount: 293 },
  { _id: "33", date: "2024-05-03T00:00:00.000Z", amount: 247 },
  { _id: "34", date: "2024-05-04T00:00:00.000Z", amount: 385 },
  { _id: "35", date: "2024-05-05T00:00:00.000Z", amount: 481 },
  { _id: "36", date: "2024-05-06T00:00:00.000Z", amount: 498 },
  { _id: "37", date: "2024-05-07T00:00:00.000Z", amount: 388 },
  { _id: "38", date: "2024-05-08T00:00:00.000Z", amount: 149 },
  { _id: "39", date: "2024-05-09T00:00:00.000Z", amount: 227 },
  { _id: "40", date: "2024-05-10T00:00:00.000Z", amount: 293 },
  { _id: "41", date: "2024-05-11T00:00:00.000Z", amount: 335 },
  { _id: "42", date: "2024-05-12T00:00:00.000Z", amount: 197 },
  { _id: "43", date: "2024-05-13T00:00:00.000Z", amount: 197 },
  { _id: "44", date: "2024-05-14T00:00:00.000Z", amount: 448 },
  { _id: "45", date: "2024-05-15T00:00:00.000Z", amount: 473 },
  { _id: "46", date: "2024-05-16T00:00:00.000Z", amount: 338 },
  { _id: "47", date: "2024-05-17T00:00:00.000Z", amount: 499 },
  { _id: "48", date: "2024-05-18T00:00:00.000Z", amount: 315 },
  { _id: "49", date: "2024-05-19T00:00:00.000Z", amount: 235 },
  { _id: "50", date: "2024-05-20T00:00:00.000Z", amount: 177 },
  { _id: "51", date: "2024-05-21T00:00:00.000Z", amount: 82 },
  { _id: "52", date: "2024-05-22T00:00:00.000Z", amount: 81 },
  { _id: "53", date: "2024-05-23T00:00:00.000Z", amount: 252 },
  { _id: "54", date: "2024-05-24T00:00:00.000Z", amount: 294 },
  { _id: "55", date: "2024-05-25T00:00:00.000Z", amount: 201 },
  { _id: "56", date: "2024-05-26T00:00:00.000Z", amount: 213 },
  { _id: "57", date: "2024-05-27T00:00:00.000Z", amount: 420 },
  { _id: "58", date: "2024-05-28T00:00:00.000Z", amount: 233 },
  { _id: "59", date: "2024-05-29T00:00:00.000Z", amount: 78 },
  { _id: "60", date: "2024-05-30T00:00:00.000Z", amount: 340 },
  { _id: "61", date: "2024-05-31T00:00:00.000Z", amount: 178 },
  { _id: "62", date: "2024-06-01T00:00:00.000Z", amount: 178 },
  { _id: "63", date: "2024-06-02T00:00:00.000Z", amount: 470 },
  { _id: "64", date: "2024-06-03T00:00:00.000Z", amount: 103 },
  { _id: "65", date: "2024-06-04T00:00:00.000Z", amount: 439 },
  { _id: "66", date: "2024-06-05T00:00:00.000Z", amount: 88 },
  { _id: "67", date: "2024-06-06T00:00:00.000Z", amount: 294 },
  { _id: "68", date: "2024-06-07T00:00:00.000Z", amount: 323 },
  { _id: "69", date: "2024-06-08T00:00:00.000Z", amount: 385 },
  { _id: "70", date: "2024-06-09T00:00:00.000Z", amount: 438 },
  { _id: "71", date: "2024-06-10T00:00:00.000Z", amount: 155 },
  { _id: "72", date: "2024-06-11T00:00:00.000Z", amount: 92 },
  { _id: "73", date: "2024-06-12T00:00:00.000Z", amount: 492 },
  { _id: "74", date: "2024-06-13T00:00:00.000Z", amount: 81 },
  { _id: "75", date: "2024-06-14T00:00:00.000Z", amount: 426 },
  { _id: "76", date: "2024-06-15T00:00:00.000Z", amount: 307 },
  { _id: "77", date: "2024-06-16T00:00:00.000Z", amount: 371 },
  { _id: "78", date: "2024-06-17T00:00:00.000Z", amount: 475 },
  { _id: "79", date: "2024-06-18T00:00:00.000Z", amount: 107 },
  { _id: "80", date: "2024-06-19T00:00:00.000Z", amount: 341 },
  { _id: "81", date: "2024-06-20T00:00:00.000Z", amount: 408 },
  { _id: "82", date: "2024-06-21T00:00:00.000Z", amount: 169 },
  { _id: "83", date: "2024-06-22T00:00:00.000Z", amount: 317 },
  { _id: "84", date: "2024-06-23T00:00:00.000Z", amount: 480 },
  { _id: "85", date: "2024-06-24T00:00:00.000Z", amount: 132 },
  { _id: "86", date: "2024-06-25T00:00:00.000Z", amount: 141 },
  { _id: "87", date: "2024-06-26T00:00:00.000Z", amount: 434 },
  { _id: "88", date: "2024-06-27T00:00:00.000Z", amount: 448 },
  { _id: "89", date: "2024-06-28T00:00:00.000Z", amount: 149 },
  { _id: "90", date: "2024-06-29T00:00:00.000Z", amount: 103 },
  { _id: "91", date: "2024-06-30T00:00:00.000Z", amount: 446 },
];
