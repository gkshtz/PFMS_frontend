import React, { useContext, useState } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';
import { checkAccessTokenValidity, refreshToken } from '../../RefreshToken';
import { useNavigate } from 'react-router-dom';
import tokenNames from '../../Constants/TokenNames';

export default function TransactionForm() 
{
    const initialData = {
        transactionName: "",
        transactionDescription: "",
        transactionAmount: 0,
        transactionCategoryId: '',
        transactionDate: "",
        transactionType: 0
    }

    const loginContext = useContext(LoginContext);
    const [formData, setFormData] = useState(initialData);
    const [loaded, setLoaded] = useState(false);
    const [isFetched0, setFetched0] = useState(false);
    const [isFetched1, setFetched1] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categories0, setCategories0] = useState([]);
    const [categories1, setCategories1] = useState([]);

    const navigate = useNavigate();

    async function onSubmit(event)
    {
        event.preventDefault();

        var token = loginContext.jwt;
        if(checkAccessTokenValidity(token)==false)
        {
            token = await refreshToken();
            if(token)
            {
                loginContext.setJwt(token);
                localStorage.setItem(tokenNames.accessToken, token);
            }
            else
            {
                localStorage.removeItem(accessToken);
                loginContext.setAuthenticationStatus(false);
                loginContext.setJwt('');
                navigate('/login');
            }
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",`Bearer ${loginContext.jwt}`);

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
        
        const requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        requestHeaders.append('Authorization', `Bearer ${loginContext.jwt}`)
        try
        {
            const response = await fetch(`http://localhost:5144/api/categories/${formData.transactionType}`, {
                method: 'GET',
                headers: requestHeaders
            })

            const payload = await response.json();

            if(response.ok)
            {
                const data = payload.responseData;
                return data;
            }
            else if(response.status == 401)
            {
                navigate('/login');
            }
            alert(payload.errorName);
            return null;
        }
        catch
        {
            alert('Something went wrong');
            return null;
        }
    }

    async function handleFocus()
    {
        setLoaded(false);

        let token = loginContext.jwt;
        if(!checkAccessTokenValidity(token))
        {
            token = await refreshToken();
            if(token)
            {
                loginContext.setJwt(token);
                localStorage.setItem(tokenNames.accessToken, token);
            }
            else
            {
                loginContext.setAuthenticationStatus(false);
                loginContext.setJwt('');
                localStorage.removeItem(tokenNames.accessToken);
                navigate('/login');
            }
        }
        
        if(formData.transactionType == 0)
        {
            if(!isFetched0)
            {
                const data = await fetchCategories();
                if(data)
                {
                    setCategories0(data);
                    setCategories(data);
                    setFetched0(true);
                }
            }
            else
            {
                setCategories(categories0);
            }
        }
        else if(formData.transactionType == 1)
        {
            if(!isFetched1)
            {
                const data = await fetchCategories();
                if(data)
                {
                    setCategories1(data);
                    setCategories(data);
                    setFetched1(true);   
                }
            }
            else
            {
                setCategories(categories1);
            }
        }
        setLoaded(true);
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
                    <select name='transactionCategoryId' value={formData.categoryId} onChange={handleChange} onFocus={handleFocus}>
                        <option key={0} value="">Select Category</option>
                        {loaded? 
                        /* In React, the key attribute is required when rendering lists, including dropdown options, to improve performance and avoid rendering issues but it’s not submitted with the form data. Only the value attribute is submitted.*/
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
