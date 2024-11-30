import { jwtDecode } from "jwt-decode";
export async function refreshToken()
{
    try
    {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch('http://localhost:5144/api/users/refreshed-access-token', {
            method: 'GET',
            credentials: "include",
            headers: headers
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
    if((exp*1000)>currentTime)
        return true;
    return false;
}