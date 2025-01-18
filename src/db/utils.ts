import { getDB } from ".";

type Store = "categories" | "budgets" | "expenses";

export const getPaginatedData = async <T>(
  storeName: Store,
  offset: number,
  limit: number,
  index?: string
) => {
  const db = await getDB();

  const tx = db.transaction(storeName, "readonly");
  let store = tx.objectStore(storeName);

  const result: T[] = [];
  let count = 0;

  if (index) {
    // Ensure the store has an index on the `date` field
    store = store.index(index as never) as any;
  }

  // Fetch total count of documents
  const totalDocuments = await store.count();
  const totalPages = Math.ceil(totalDocuments / limit);

  if (totalDocuments > 0) {
    // Open cursor on the `date` index in descending order
    let cursor = await store.openCursor(null, "prev");
    while (cursor && count < offset) {
      cursor = await cursor.continue();
      count++;
    }

    // Collect `limit` number of records
    count = 0;
    while (cursor && count < limit) {
      result.push(cursor.value as T);
      cursor = await cursor.continue();
      count++;
    }
  }

  return {
    data: result,
    pages: totalPages,
  };
};
