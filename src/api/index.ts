import { ProviderTransactions } from "./interfaces";

const API_BASE_URL = "http://www.mocky.io/v2";

export async function fetchTransactionsByProvider() {
  return fetch(`${API_BASE_URL}/5c62e7c33000004a00019b05`).then((res) => res.json() as Promise<ProviderTransactions>);
}
