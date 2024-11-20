import React, { useContext, useEffect, useState } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard'
import { LoginContext } from '../../Contexts/LoginContext'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);
  let [transactions, setTransactions] = useState([]);
  let [deletedIndex, setDeletedIndex] = useState(-1);
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

  if(deletedIndex!=-1)
  {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(deletedIndex, 1);
    setTransactions(updatedTransactions);
    setDeletedIndex(-1);
  }

  return (
    <div>   
      <button id='addTransactionBtn' onClick={()=>{navigate('/add-transaction')}}>Add Transaction</button>
      {transactions.length>0 ?
        transactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} setDeletedIndex={setDeletedIndex} index={index}/>
        )) 
      : <div>No transactions available</div>}
    </div>
  )  
}
