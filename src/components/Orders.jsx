// Orders.js
import React from 'react';
import './css/Orders.css';

// Sample ডেটা, যা আসলে আপনার backend থেকে আসবে
const customerOrders = [
  {
    id: 'A1234',
    date: '2024-06-10',
    status: 'Delivered',
    total: 45.50,
    items: [
      { name: 'Fresh Apples', quantity: 2 },
      { name: 'Organic Carrots', quantity: 1 },
    ],
  },
  {
    id: 'B5678',
    date: '2024-06-15',
    status: 'Processing',
    total: 30.00,
    items: [
      { name: 'Bananas', quantity: 5 },
      { name: 'Tomatoes', quantity: 3 },
    ],
  },
];

const Orders = () => {
  return (
    <div className="orders-container">
      <h1 className="orders-title">আপনার অর্ডারসমূহ</h1>

      {customerOrders.length === 0 ? (
        <p className="no-orders">আপনার কোনো অর্ডার নেই।</p>
      ) : (
        <div className="orders-list">
          {customerOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">অর্ডার #{order.id}</span>
                <span className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <p><strong>অর্ডারের তারিখ:</strong> {order.date}</p>
              <p><strong>মোট দাম:</strong> ৳{order.total.toFixed(2)}</p>
              <div className="order-items">
                <strong>আইটেমসমূহ:</strong>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} - পরিমাণ: {item.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
