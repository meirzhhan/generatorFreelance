type Transaction = [string, string, string, string, string];
export type Transactions = Transaction[];

interface TransactionsInfoProps {
  transactions?: Transactions;
  consumer: number;
}

const TransactionsInfo = (props: TransactionsInfoProps) => {
  const { transactions, consumer } = props;

  if (!transactions || transactions.length === 0) return null;

  return (
    <div className="TransactionWrapper">
      <p>
        Все транзакции потребителя:{' '}
        <span style={{ color: 'blue' }}>{consumer}</span>
      </p>

      {transactions.map((tran, index) => (
        <div className="TransactionsInfo" key={index}>
          <p>
            Адрес генератора: <span style={{ color: 'red' }}>{tran[0]}</span>{' '}
          </p>
          <p>
            Адрес потребителя: <span style={{ color: 'blue' }}>{tran[1]}</span>
          </p>
          {/* <p>{tran[2]}</p> */}
          {/* <p>{tran[3]}</p> */}
          <p>Цена: {tran[4]} тенге</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionsInfo;
