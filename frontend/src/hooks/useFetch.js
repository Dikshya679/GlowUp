import { useState } from "react";

const useFetch =(url)=>
{
const [data, setData] = useState(null)
const [loading , setLoading] = useState(false)
const [error, setError] = useState(null)


const fetchData= async (options)=>
{
    setLoading(true)
    setError(null)
    try {
          const response= await fetch(url, options)
        const result = await response.json()
        if(!response.ok)
        {
            throw new Error(result.error || "Request Failed")
        }
        setData(result)
        return result;
    } catch (error) {
      setError(error.message)
      throw error;

    }
    finally {
        setLoading(false)
    }
};
return { data , error ,loading , fetchData}
};
export default useFetch;