import axios from 'axios'

const supplyRequest = async(url: string, decimals:number): Promise<any> => {
  const response =  await axios.get(url);
  let supply = "0"  
  if(response.status === 200) 
    supply= response.data.result
  return {tokens:supply, decimals}
}

export default {
    supplyRequest
}