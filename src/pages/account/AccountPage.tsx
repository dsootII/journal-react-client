import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../lib/context/UserContext";
import { useNavigate } from 'react-router-dom';
import { Entry } from "../../lib/types";
import createAxiosInstance from "../../lib/customAxios";
import { ENDPOINTS } from "../../lib/config";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import Modal from "./components/Modal";
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const defaultEntry: Entry = {
  id: 0,
  title: '',
  body: '',
  created_at: '',
  updated_at: '',
  user: 0,
  container: 0,
};

export default function AccountPage() {
  const {userDetails, setContainersUpdated} = useUserContext();
  const { user, containers } = userDetails;

  const [newContainerName, setNewContainerName] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  
  const navigate = useNavigate();
  
  const [selectedContainerTab, setSelectedContainerTab] = useState(-1);
  const [deleteSelectedContainer, toggleDeleteSelectedContainer] = useState(false);
  const [deleteEntry, toggleDeleteEntry] = useState(false);
  const containerNameRef = useRef('none');
  const entryRef = useRef(defaultEntry);

  useEffect(() => {
    // debugger;
    const axiosInstance = createAxiosInstance()
    console.log('accpage useEffect ran')
    if (deleteSelectedContainer) {
      if (confirm(`deleting container "${containerNameRef.current}" permanently`)) {
        axiosInstance.delete(ENDPOINTS.deleteContainer + `${selectedContainerTab}/`)
        .then(res => {
          console.log(res);
          setContainersUpdated(true)
        })
      }
    }
    if (deleteEntry) {
      if (confirm(`deleting entry "${entryRef.current?.title}" permanently`)) {
        axiosInstance.delete(ENDPOINTS.createEntry+`${entryRef.current?.id}/`)
        .then(res => {
          console.log(res);
          setContainersUpdated(true);
        })
      }
    }
    toggleDeleteSelectedContainer(false)
    toggleDeleteEntry(false)

  }, [deleteSelectedContainer, deleteEntry])


  function handleModalOpening(isOpen: boolean) {
    setIsModalOn(isOpen);
  }

  function handleEntryDeletion(entry: Entry) {
    console.log("event handler fired");
    entryRef.current = entry;
    toggleDeleteEntry(true);
  }



  return (
    <Flex className='h-screen bg-gradient-to-t from-stone-600 to-stone-800' gap={"3"} direction={'column'}>
      <Card>
        {
          Object.entries(user).map(
            entry => (
              <div><Text><strong>{entry[0]}</strong>: {entry[1]}</Text></div>
            )
          )
        }
      </Card>   
      <Card>
        <Button color='jade' onClick={() => setIsModalOn(true)}>+ Add Container</Button>
        <Button color='red' className='ml-2' onClick={() => toggleDeleteSelectedContainer(true)}>Delete Selected Container</Button>
        <Button color='amber' className='ml-2' onClick={() => navigate('/user/journal')}>Go back to Journal</Button>
        <Modal
          isModalOn={isModalOn}
          handleModalOpening={handleModalOpening}
          newContainerName={newContainerName}
          setNewContainerName={setNewContainerName}
        />
        <Tabs.Root>
          <Tabs.List>
            {
              containers.map(container => (
                <Tabs.Trigger
                  key={container.id}
                  value={container.name}
                  className="px-2 py-1 rounded-lg mt-2 data-[state=active]:bg-stone-800 data-[state=active]:text-white hover:bg-stone-500 hover:text-white text-black"
                  onClick={() => {
                    setSelectedContainerTab(container.id)
                    containerNameRef.current = container.name
                  }}
                >
                  {container.name}{' '}({container.entries.length})
                </Tabs.Trigger>
              ))
            }
          </Tabs.List>
          {
            containers.map(container => (
              <Tabs.Content key={container.id} value={container.name}>
                <ScrollArea.Root>
                  <ScrollArea.Viewport
                    className='border border-gray-600 mt-1 rounded-2xl max-h-80'
                  >
                    {
                      container.entries.map(entry => (
                        <div
                          className=' flex justify-start h-10 items-center border border-gray-200 hover:shadow-md hover:font-bold'>
                          <div onClick={() => handleEntryDeletion(entry)}><TrashIcon  /></div>
                          <Text className='px-2'>{entry.title}</Text>
                        </div>
                      ))
                    }
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner />
                </ScrollArea.Root>

              </Tabs.Content>
            ))
          }


        </Tabs.Root>
      </Card>

    </Flex>
  )
}

function TrashIcon() {
  return (
    <div className='hover:text-red-800 hover:shadow-red-800 hover:shadow-sm rounded-full hover:bg-red-400 p-2'>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" data-darkreader-inline-fill=""></path>
      </svg>
    </div>
  )
}
