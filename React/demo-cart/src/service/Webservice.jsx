import axios from "axios";

class Webservice{

            GetAPICall(url)
            {
                var result = axios.get(url) 
                return result;  
            }
}
export default new Webservice();