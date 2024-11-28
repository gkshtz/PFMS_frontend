import { jwtDecode } from "jwt-decode";
export async function refreshToken()
{
    try
    {
        const response = await fetch('http://localhost:5144/api/users/access-token', {
            method: 'GET'
        })

        if(response.ok)
        {
            const payload = await response.json();
            return payload.responseData;
        }
        return null;
    }
    catch
    {
        return null;
    }
 }

export function checkAccessTokenValidity(token)
{
    const { exp } = jwtDecode(token);
    const currentTime = Date.now();
    if(exp>currentTime)
        return true;
    return false;
}