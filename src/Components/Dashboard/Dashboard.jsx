import React, { useContext, useEffect, useState } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard'
import { LoginContext } from '../../Contexts/LoginContext'

export default function Dashboard() {
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
        console.log("->",responseData);
        setTransactions(responseData.responseData);
        console.log("transactions->",transactions, transactions.length);
      }
    }
    fetchTransactions();
  },[])
  return (
    <div>   
      {transactions.length>0 ?
        transactions.map((transaction) => (
          <TransactionCard transaction={transaction}/>
        )) 
      : <div>No transactions available</div>}
    </div>
  )  
}
