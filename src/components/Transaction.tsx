import React, { FC, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useSelector, actions, useDispatch } from '../store';
import useQuery from '../hooks/useQuery';
import useAPI from '../hooks/useAPI';
import { Transaction } from '../types';
const Transactions: FC = () => {
  const { getTransactions, deleteTransactionByID } = useAPI();
  const dispatch = useDispatch();
  const { query, setQuery } = useQuery();
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    const { page } = query;
    if (!Number(page)) {
      setQuery({ page: 0 });
      dispatch(actions.set({ transactions: {} }));
    }
    getTransactions(Number(page) || 0).then((transactions) => {
      if (!Number(page)) dispatch(actions.set({ transactions }));
      else dispatch(actions.addTransactions({ transactions }));
    });
  }, [dispatch, getTransactions, query, setQuery]);

  const deleteTransaction = (id: string) => {
    deleteTransactionByID(id).then((transaction) => {
      const copiedTransaction = Object.assign({}, transactions);

      copiedTransaction[transaction.id] = {
        ...transaction
      };

      dispatch(actions.set({ transactions: copiedTransaction }));

      toast(`Transaction deleted #${transaction.id}`, { type: 'success' });
    });
  };
  return (
    <main className="Welcome">
      <h1>Transactions</h1>
      <p>Total transactions count: {Object.values(transactions).length}</p>
      <Table>
        <thead>
          <tr>
            <td>Token Name</td>
            <td>Token</td>
            <td>Amount</td>
            <td>To</td>
            <td>From</td>
          </tr>
        </thead>
        <tbody>
          {Object.values(transactions).map((transaction: Transaction) =>
            transaction.deleted ? null : (
              <tr key={transaction.id}>
                <td>{transaction.tokenName}</td>
                <td>{transaction.token}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.to}</td>
                <td>{transaction.from}</td>
                <Button onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          const page = Number(query.page) + 1 || 1;
          setQuery({ page: page });
        }}
      >
        More
      </Button>
    </main>
  );
};

export default Transactions;
