import React, { useContext } from 'react';
import './TransactionCard.css';
import { LoginContext } from '../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { checkAccessTokenValidity, refreshToken } from '../../RefreshToken';

export default function TransactionCard(props) 
{

  const loginContext = useContext(LoginContext);

  const handleDeleteClick = async ()=>{
    let token = loginContext.jwt;
        if(!checkAccessTokenValidity(token))
        {
            token = await refreshToken();
            if(token)
            {
                loginContext.setJwt(token);
                localStorage.setItem('access-token', token);
            }
            else
            {
                loginContext.setAuthenticationStatus(false);
                loginContext.setJwt('');
                localStorage.removeItem('access-token');
                navigate('/login');
            }
        }

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

      if(props.transaction.transactionType == 0)
      {
        const {totalExpence, setTotalExpence} = props.totalTransactionAmounts;
        setTotalExpence(totalExpence - props.transaction.transactionAmount);
      }
      else if(props.transaction.transactionType == 1)
      {
        const {totalIncome, setTotalIncome} = props.totalTransactionAmounts;
        setTotalIncome(totalIncome - props.transaction.transactionAmount);
      }
    }
    else
    {
      const payload = await response.json();
      alert(payload.errorName);
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
