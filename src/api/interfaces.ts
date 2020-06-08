export interface ITransaction {
  id: string;
  date: string;
  description: string;
  category_title: string;
  amount: {
    value: number;
    currency_iso: string;
  };
}

export interface IProvider {
  title: string;
  account_number: string;
  sort_code: string;
  description: string;
}

export interface IBalance {
  amount: number;
  currency_iso: string;
}

export interface ProviderTransactions {
  id: string;
  provider: IProvider;
  balance: IBalance;
  transactions: ITransaction[];
}
