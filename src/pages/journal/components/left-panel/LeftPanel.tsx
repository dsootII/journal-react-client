import ContainerDetail from "./ContainerDetail";
import EntryList from "./EntryList";

export default function LeftPanel() {  

  return (
    <div className='flex flex-col h-screen'>
        
      <ContainerDetail />      
      <EntryList />
        
    </div>
  )
}