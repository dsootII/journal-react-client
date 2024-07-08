import { useJournalContext } from "../../../lib/context/JournalContext";
import { useAuthContext } from "../../../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@radix-ui/themes";



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
    <div className="flex w-full justify-end px-3 items-center bg-gradient-to-l from-stone-700 to-stone-800">

      <Button 
        className="p-2 m-2 hover:shadow-sm bg-stone-200" 
        variant={"outline"} 
        onClick={handleNewNoteCreation}
      >
        Create New Note
      </Button>
      <Button 
        className="p-2 m-2 hover:shadow-sm bg-stone-200" 
        variant={"outline"}
        onClick={() => navigate('/user/account')}
      >
        Account
      </Button>
      <Button className="p-2 m-2 hover:shadow-sm" onClick={handleLogout}>Logout</Button>

    </div>
  )
}
