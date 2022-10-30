import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading,setLoading] = useState(false),
          [error, setError] = useState(null)

    const req = useCallback (async (url, body = null, method = 'GET', headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)
        try{
            let res = await fetch(url,{method, body, headers})
            if(!res.ok){
                throw new Error (`Could not fetch ${url}, status - ${res.status} `)
            }
            const data = await res.json()
            setLoading(false)
            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])
    const resetError = useCallback(() => {setError(null)},[])
    return {loading, error, resetError, req}
}
export default useHttp