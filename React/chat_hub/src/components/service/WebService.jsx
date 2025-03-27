import axios from "axios";

class WebService
{
    postAPICall(url,data)
    {
        var result = axios.post(url,data);
        return result;
    }
    getAPICall(url,token)
    {
        var result = axios.get(url,{
            headers:{
                'Authorization': 'Bearer '+token
            }
        })
        return result;
    }
    putAPICall(url,data,token){
        var result = axios.put(url,data,{ headers: { Authorization: `Bearer ${token}` } })
        return result;
    }
    postAPICallUsingUploadData(url,token,data){
        const result = axios.post(url,data,{ headers: { Authorization: `Bearer ${token}` } })
        return result;
    }
    // postAPICall_second(url,token,data){
    //     const result = axios.post(url,data,{ headers: { Authorization: `Bearer ${token}` } })
    //     return result;
    // }
    
}
export default new WebService();