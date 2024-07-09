import { useJournalContext } from "../../../lib/context/JournalContext";
import { useAuthContext } from "../../../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Flex } from "@radix-ui/themes";



export default function Navbar() {
  const navigate = useNavigate();
  const {logout} = useAuthContext(); 

  const {
    currentThought,
    currentThoughtTitle,
    setCurrentThought,
    setCurrentThoughtTitle
  } = useJournalContext();
  
  function handleLogout() {
    logout();
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('refreshToken')) {
        localStorage.removeItem('refreshToken');
      }
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
      }
      navigate('/')
    }
    
  }

  function handleNewNoteCreation () {
    if(currentThought.length>0 || currentThoughtTitle.length>0) {
      if (confirm("Perish current thought?")){
        setCurrentThought('');
        setCurrentThoughtTitle('');
      }
    }
  }

  return (
    <Flex gap={"3"} justify={'end'} className="w-full justify-end px-4 py-3 items-center">
    <Button 
      color="iris"
      variant={"solid"} 
      onClick={handleNewNoteCreation}
    >
      Create New Note
    </Button>
    <Button 
      color="iris"
      variant={"solid"}
      onClick={() => navigate('/user/account')}
    >
      Account
    </Button>
    <Button 
      variant="solid"
      color="gray"
      onClick={handleLogout}
    >
      Logout
    </Button>
  </Flex>
  )
}
