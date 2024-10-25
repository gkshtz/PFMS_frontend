import React from 'react';
import './TransactionCard.css';

export default function TransactionCard(props) {
  return (
    <div>
      <div className="transaction-card">
        <h3 className='row'>{props.transaction.transactionName}</h3>
        <p className='row'>{props.transaction.transactionDescription||"No Description"}</p>
        <p className='row'><strong>Amount:</strong> {props.transaction.transactionAmount}</p>
        <p className='row'><strong>Date:</strong> {props.transaction.transactionDate}</p>
        <p className='row'><strong>Type:</strong> {props.transaction.transactionType==0?"Expense":"Income"}</p>
        </div>
    </div>
  )
}
