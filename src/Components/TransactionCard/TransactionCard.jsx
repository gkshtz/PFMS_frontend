import React, { useContext } from 'react';
import './TransactionCard.css';
import { LoginContext } from '../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function TransactionCard(props) 
{

  const loginContext = useContext(LoginContext);
  const handleDeleteClick = async ()=>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization',`Bearer ${loginContext.jwt}`)
    const response = await fetch(`http://localhost:5144/api/transactions/${props.transaction.transactionId}`, {
      method: 'DELETE',
      headers: headers
    });
    if(response.ok)
    {
      alert('Transaction Deleted Successfully');
      props.setDeletedIndex(props.index);
    }
  }
  return (
    <div>
      <div className="transaction-card">
        <h3 className='row'>{props.transaction.transactionName}</h3>
        <p className='row'>{props.transaction.transactionDescription||"No Description"}</p>
        <p className='row'><strong>Amount:</strong> {props.transaction.transactionAmount}</p>
        <p className='row'><strong>Date:</strong> {props.transaction.transactionDate}</p>
        <p className='row'><strong>Type:</strong> {props.transaction.transactionType==0?"Expense":"Income"}</p>
        <div className='row'><button id='deleteButton' onClick={handleDeleteClick}>Delete Transaction</button></div>
        </div>
    </div>
  )
}
