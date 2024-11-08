import React, { useContext, useEffect, useState } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard'
import { LoginContext } from '../../Contexts/LoginContext'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
    async function fetchTransactions()
    {
      const token = loginContext.jwt;
      const response = await fetch('http://localhost:5144/api/transactions', {
        method:'GET',
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(response.ok)
      {
        const responseData = await response.json();
        setTransactions(responseData.responseData);
      }
    }
    fetchTransactions();
  },[])

  return (
    <div>   
      <button id='addTransactionBtn' onClick={()=>{navigate('/add-transaction')}}>Add Transaction</button>
      {transactions.length>0 ?
        transactions.map((transaction) => (
          <TransactionCard transaction={transaction}/>
        )) 
      : <div>No transactions available</div>}
    </div>
  )  
}
