import React, { useContext, useState } from 'react'
import { LoginContext } from '../../Contexts/LoginContext';

export default function TransactionForm() 
{
    const initialData = {
        transactionName: "",
        transactionDescription: "",
        transactionAmount: 0,
        transactionDate: "",
        transactionType: ""
    }

    const loginContext = useContext(LoginContext);
    const [formData, setFormData] = useState(initialData);
    const [loaded, setLoaded] = useState(false);
    const [isFetched, setFetched] = useState(false);
    const [categories, setCategories] = useState([]);

    async function onSubmit(event)
    {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",`Bearer ${loginContext.jwt}`);

        console.log("type ", typeof formData.transactionType);
        console.log("amount ", typeof formData.transactionAmount);

        const response = await fetch('http://localhost:5144/api/transactions', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: myHeaders            
        });

        if(response.status == 201)
        {
            alert("Transaction Added successfully");
        }
    }

    function handleChange(event)
    {
        let {name, value} = event.target;
        if(name == "transactionType" || name == "transactionAmount")
        {
            value = Number(value);
        }
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function fetchCategories()
    {
        const requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        requestHeaders.append('Authorization', `Bearer ${loginContext.jwt}`)
        try
        {
            const response = await fetch('http://localhost:5144/api/categories', {
                method: 'GET',
                headers: requestHeaders
            })

            if(response.ok)
            {
                const payload = await response.json();
                setCategories(payload.responseData);
                setFetched(true);
                setLoaded(true);
            }
        }
        catch
        {
            alert('Something went wrong')
        }
    }

    async function handleFocus()
    {
        if(isFetched == false)
        {
            await fetchCategories();
        }
    }
  return (
    <div className="formContainer">
      <div id="formTitle">Add New Transaction</div>
            <form onSubmit={onSubmit}>
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

                <div>
                    <select onFocus={handleFocus}>
                        <option value="">Select Category</option>
                        {loaded? 
                        categories.map((category)=>
                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>)
                        :
                        <option>Loading...</option>}
                    </select>
                </div>

                <input type="submit" value="Submit" id='submit'></input>
            </form>
    </div>
  )
}
