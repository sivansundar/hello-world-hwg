import useFetch from "@/components/hooks/useFetch";
import { useEffect } from "react";

const GraphqlData = () => {

    const fetch = useFetch()

    useEffect(()=>{
        fetchGraphQLData()
    },[]) 

    async function fetchGraphQLData(){
        console.log("fetch func called")

        try {
            console.log("Before API called")

            const response = await (await fetch("/api/apps/polaris")).json()
            console.log("REs" , response)

        } catch (error) {
            console.log("REs ERR" , error.message)

        }
    }   
    return ( 
        // UI is built here! 
        <>GraphQL SSS How </>
     );
}
 
export default GraphqlData;