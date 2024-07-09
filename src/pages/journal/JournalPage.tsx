import { useJournalContext } from "../../lib/context/JournalContext";
import Entry from "./components/entry-panel/Entry";
import LeftPanel from "./components/left-panel/LeftPanel";
import Navbar from "./components/Navbar";


export default function JournalPage() {
  const { loading } = useJournalContext();
  
  // h-screen w-screen flex bg-gradient-to-r from-white to-gray-800

  return (

    <div className="h-screen w-screen flex bg-gradient-to-b from-gray-300 to-gray-800">
      {
        loading ?
        <div className="text-white">Loading, please wait...</div> :
        <>
          <div className="w-1/3">
            <LeftPanel />
          </div>

          <div className="w-2/3 flex flex-col">
            <div>
              <Navbar />
            </div>
            
            <Entry/>

          </div>
        </>
      }
    </div>
  )
}
