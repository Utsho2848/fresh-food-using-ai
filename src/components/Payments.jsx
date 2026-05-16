function Payments() {
  const payments = [
    { id: 1, method: "Credit Card", amount: "$20", date: "2026-05-10" },
    { id: 2, method: "Bkash", amount: "$40", date: "2026-05-12" },
  ];

  return (
    <div>
      <h2>Payment Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Method</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.method}</td>
              <td>{p.amount}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;