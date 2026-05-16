function Orders() {
  const orders = [
    { id: 1, item: "T-Shirt", status: "Delivered", price: "$20" },
    { id: 2, item: "Jeans", status: "Pending", price: "$40" },
  ];

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            {o.item} - {o.status} - {o.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;