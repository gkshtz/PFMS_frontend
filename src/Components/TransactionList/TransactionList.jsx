import React, { useContext, useEffect, useState } from 'react'
import TransactionCard from '../TransactionCard/TransactionCard'
import { LoginContext } from '../../Contexts/LoginContext'
import { useNavigate } from 'react-router-dom';
import './TransactionList.css';

export default function TransactionList() {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);
  let [transactions, setTransactions] = useState([]);
  let [deletedIndex, setDeletedIndex] = useState(-1);
  const [totalExpence, setTotalExpence] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);

  useEffect(()=>{
    async function fetchTransactions()
    { 
      const token = loginContext.jwt;
      let response = await fetch('http://localhost:5144/api/transactions', {
        method:'GET',
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if(response.ok)
      {
        const payload = await response.json();
        setTransactions(payload.responseData);
      }

      response = await fetch('http://localhost:5144/api/transactions/total-transaction-amount', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        } 
      })

      if(response.ok)
      {
        const payload = await response.json();
        setTotalExpence(payload.responseData.totalExpence);
        setTotalIncome(payload.responseData.totalIncome);
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
      <button id='userProfile' onClick={()=>{navigate('/user-profile')}}>Profile</button>
      <div id='totalTransactionAmountContainer'>
        <span id='totalExpence'>{totalExpence}</span>
        <span id='totalIncome'>{totalIncome}</span>
      </div>
      {transactions.length>0 ?
        transactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} setDeletedIndex={setDeletedIndex} index={index} totalTransactionAmounts={{totalExpence, totalIncome, setTotalExpence, setTotalIncome}}/>
        )) 
      : <div>No transactions available</div>}
    </div>
  )  
}
