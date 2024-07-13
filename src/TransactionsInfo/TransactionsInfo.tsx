type Transaction = [string, string, string, string, string]; // Тип для транзакции
export type Transactions = Transaction[]; // Тип для массива транзакций

interface TransactionsInfoProps {
  transactions?: Transactions; // Список транзакций. может не быть для выбранного потребителя
  consumer: number; // ID потребителя
}

const TransactionsInfo = (props: TransactionsInfoProps) => {
  const { transactions, consumer } = props;

  // Если нет транзакций
  if (!transactions || transactions.length === 0)
    return <div>Нет активных подключений для потребителя: {consumer}</div>;

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
