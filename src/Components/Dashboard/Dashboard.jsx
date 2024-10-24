import React, { useContext, useEffect } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard'
import { LoginContext } from '../../Contexts/LoginContext'

export default function Dashboard() {
  const loginContext = useContext(LoginContext);
  let transactions;
  useEffect(()=>{
    async function fetchTransactions()
    {
      const token = loginContext.jwt;
      const response = await fetch('http://localhost:5144/api/transactions', {
        method:'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      if(response.ok)
      {
        const responseData = await response.json();
        transactions = responseData.responseData;
      }
    }
    fetchTransactions();
  },[])
  return (
    <div>   
      {transactions ? 
        transactions.map((transaction) => (
          <TransactionCard transaction={transaction}/>
        )) 
      : <div>No transactions available</div>}
    </div>
  )  
}
