import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { ThemeProvider } from "react-jss";
import { theme } from "../../theme";
import { Transaction } from "../Transactions/Transaction";
import { Transactions } from "../Transactions";

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

test("Transaction component renders correctly", () => {
  const mockTransaction = {
    id: "13acb877dc4d8030c5dacbde33d3496a2ae3asdc000db4c793bda9c3228baca1a28",
    date: "2018-06-30",
    description: "Tesco",
    category_title: "Groceries",
    amount: {
      value: -57.21,
      currency_iso: "GBP",
    },
  };
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Transaction transaction={mockTransaction} delay={0} />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="wrapper-0-2-2 wrapper-d0-0-2-6"
    >
      <div>
        June 30, 2018
      </div>
      <div
        className="info-0-2-3"
      >
        <div
          className="meta-0-2-4"
        >
          <div
            className="category-0-2-5"
          >
            <svg
              color="#c8c8c8"
              fill="currentColor"
              height={15}
              size={15}
              stroke="currentColor"
              strokeWidth="0"
              style={
                Object {
                  "color": "#c8c8c8",
                }
              }
              viewBox="0 0 24 24"
              width={15}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
          </div>
          <div>
            Tesco
          </div>
        </div>
        <div>
          <span
            style={
              Object {
                "color": "#cb4646",
                "paddingRight": 5,
              }
            }
          >
            57.21
          </span>
          <span>
            GBP
          </span>
        </div>
      </div>
    </div>
  `);
});

const mockResponse = {
  id: "0eb7acfd6fa3449676947c9521311cfce618bf9129ac5ac07ba30c76843e0f65fddb",
  provider: {
    title: "Monzo",
    account_number: "12345678",
    sort_code: "12-34-56",
    description: "Current Account",
  },
  balance: {
    amount: 1250.32,
    currency_iso: "GBP",
  },
  transactions: [
    {
      id: "13acb877dc4d8030c5dacbde33d3496a2ae3asdc000db4c793bda9c3228baca1a28",
      date: "2018-06-30",
      description: "Tesco",
      category_title: "Groceries",
      amount: {
        value: -57.21,
        currency_iso: "GBP",
      },
    },
  ],
};

test("Transactions component renders without failing", async () => {
  jest.spyOn(global as any, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    })
  );

  jest.spyOn(global as any, "setTimeout").mockImplementation((cb: any) => (cb ? cb() : undefined));

  await act(async () => {
    render(
      <ThemeProvider theme={theme}>
        <Transactions />
      </ThemeProvider>,
      container
    );
  });
  expect(fetch).toHaveBeenCalledTimes(1);

  // cleanup
  (global as any).fetch.mockRestore();
  (global as any).setTimeout.mockRestore();
});
