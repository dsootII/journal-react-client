import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Containers, UserContextValueTypes } from "../types";
// import { useAuthContext } from "./AuthContext";
import createAxiosInstance from "../customAxios";
import { ENDPOINTS } from "../config";

interface StateValues {
  user: {
    id: number,
    username: string,
    email: string
  },
  containers: Containers
}

const defaultValue: UserContextValueTypes = {
  userDetails: {
    user: {
      id: 0,
      username: "testun",
      email: "testEmail"
    },
    containers: []
  }, 
  setContainersUpdated: () => { }
}

const defaultState: StateValues = {
  user: {
    id: -1,
    username: "testuewrn",
    email: "testEmewrwerail"
  },
  containers: []
}


//create context
const userContext = createContext<UserContextValueTypes>(defaultValue);

//create and export provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const { isAuthenticated, accessToken } = useAuthContext();
  
  const [userDetails, setUserDetails] = useState<StateValues>(defaultState);
  const [containersUpdated, setContainersUpdated] = useState(false);

  //get user details from backend
  useEffect(() => {
    const axiosInstance = createAxiosInstance();
    axiosInstance.get(ENDPOINTS.userDetail)
    .then(res => {
      if (res.data) {
        setUserDetails(res.data);
      }
      else {
        alert("failed to retreive user info");
      }
    })
    .catch(err => {
      console.log(err)
    });
    
    return () => setContainersUpdated(false)
  }, [containersUpdated])

  return (
    <userContext.Provider value={{userDetails, setContainersUpdated}}>
      {children}
    </userContext.Provider>
  )
}

//export hook
export const useUserContext = () => useContext(userContext);