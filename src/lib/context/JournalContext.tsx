import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Container, Containers, Entry, JournalContextValueTypes } from "../types";
import { ENDPOINTS } from "../config";
import createAxiosInstance from "../customAxios";

const defaultContainerValue: Container = {
  id: 0,
  name: "Default Container",
  entries: []
}

const defaultEntry: Entry = {
  id: 0,
  title: '',
  body: '',
  created_at: '',
  updated_at: '',
  user: 0,
  container: 0,
};


//create journal context
const JournalContext = createContext<JournalContextValueTypes>({
  loading: true,
  containerList: [],
  selectedContainer: defaultContainerValue,
  setSelectedContainer: () => {},
  currentThought: '',
  setCurrentThought: () => {},
  currentThoughtTitle: '',
  setCurrentThoughtTitle: () => {},
  setListUpdated: () => {},
  selectedEntry: defaultEntry,
  setSelectedEntry: () => {}
});

//create JournalContext component, which will return the provider component,
//with children wrapped inside

export const JournalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  // const navigate = useNavigate();  
  const [loading, setLoading] = useState(true);
  const [containerList, setContainerList] = useState<Containers>([defaultContainerValue]);
  const [selectedContainer, setSelectedContainer] = useState(0);
  const [currentThought, setCurrentThought] = useState('');
  const [currentThoughtTitle, setCurrentThoughtTitle] = useState('');
  const [listUpdated, setListUpdated] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry>(containerList[0].entries[0]);

  useEffect(() => {
    // debugger;
    createAxiosInstance()
      .get(ENDPOINTS.listContainers)
      .then(res => {
        if (res.data) {
          setContainerList(res.data);
          setLoading(false);

        }
      })
      .catch(error => {
        console.log(error);
      })
    if (typeof window !== 'undefined') {
      let possible_container = localStorage.getItem("selectedContainer")
      if (possible_container) {
        setSelectedContainer(parseInt(possible_container))
      } else {
        localStorage.setItem("selectedContainer", selectedContainer.toString());
      }
    }
    

    return () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("selectedContainer");
      }
      setLoading(true);
      setListUpdated(false);
    }
  }, [listUpdated]);

  return (
    <JournalContext.Provider 
      value={{
        loading, 
        containerList, 
        selectedContainer: containerList[selectedContainer], 
        setSelectedContainer, 
        currentThought, 
        setCurrentThought,
        currentThoughtTitle,
        setCurrentThoughtTitle,
        setListUpdated,
        selectedEntry,
        setSelectedEntry
      }}
    >
      {children}
    </JournalContext.Provider>
  )
}

//make an anonymous function that uses this context

export const useJournalContext = () => useContext(JournalContext);