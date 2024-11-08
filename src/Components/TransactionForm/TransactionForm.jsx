import React, { useState } from 'react'

export default function TransactionForm() 
{
    const initialData = {
        transactionName: "",
        transactionDescription: "",
        transactionAmount: "",
        transactionDate: "",
        transactionType: ""
    }

    const [formData, setFormData] = useState(initialData);

    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
  return (
    <div className="formContainer">
      <div id="formTitle">Add New Transaction</div>
            <form>
                <div className='label'>
                    <label htmlFor="transactionName">Enter Transaction Name</label>
                </div>
                <div>
                    <input type="text" name="transactionName" id="transactionName" value={formData.transactionName} onChange={handleChange} className='inputField'></input>
                </div>
                <div className='label'>
                    <label htmlFor="transactionDescription">Enter Transaction Description</label>
                </div>
                <div>
                    <input type="text" name="transactionDescription" id="transactionDescription" value={formData.transactionDescription} onChange={handleChange} className='inputField'></input>
                </div>           
                <div className='label'>
                    <label htmlFor="transactionAmount">Enter Transaction Amount</label>
                </div>
                <div>
                    <input type="number" step="any" name="transactionAmount" id="transactionAmount" value={formData.transactionAmount} onChange={handleChange} className='inputField'></input>
                </div>
                <div className='label'>
                    <label htmlFor="transactionDate">Enter Transaction Date</label>
                </div>
                <div>
                    <input type="datetime-local" name="transactionDate" id="transactionDate" value={formData.transactionDate} onChange={handleChange} className='inputField'></input>
                </div>           
                <div>
                    <label>Expense</label>
                    <input type="radio" name="transactionType" value={0} onChange={handleChange}/>
                    <label>Income</label>
                    <input type="radio" name="transactionType" value={1} onChange={handleChange}/>
                </div>
                <input type="submit" value="Submit" id='submit'></input>
            </form>
    </div>
  )
}
