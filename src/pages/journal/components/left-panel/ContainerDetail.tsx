import { ENDPOINTS } from "../../../../lib/config";
import { useJournalContext } from "../../../../lib/context/JournalContext";
import createAxiosInstance from "../../../../lib/customAxios";
import { Button, Card, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";


function Tick() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
}

function Cancel() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
}


export default function ContainerDetail() {

  const { selectedContainer, containerList, setListUpdated } = useJournalContext();
  const [changeContainerName, toggleChangeContainerName] = useState(false);
  const [containerNameChangeDispatchSwitch, toggleContainerNameChangeDispatchSwitch] = useState(false);
  const newContainerNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (containerNameChangeDispatchSwitch) {
      if (newContainerNameRef.current) {
        //update this container.DB call
        createAxiosInstance().patch(
          ENDPOINTS.editContainer(selectedContainer.id),
          { name: newContainerNameRef.current.value }
        ).then(res => {
          console.log(res)
          setListUpdated(true)
        }).catch(err => console.log(err))
      }
    }

    return () => toggleContainerNameChangeDispatchSwitch(false)
  }, [containerNameChangeDispatchSwitch])


  return (
<div className="h-1/6 p-4">
    {
      (containerList.length === 0) ?
        <Card className="h-full bg-gray-400 p-5 flex items-center justify-center text-gray-700">
          <em>You have no containers yet!</em>
        </Card>
        :
        <Card className="bg-gray-400 hover:bg-gray-600 h-full border-none rounded-lg p-4 cursor-pointer" onClick={() => toggleChangeContainerName(true)}>
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              {
                changeContainerName ?
                  <div className="flex items-center w-full">
                    <TextField.Root
                      type="text"
                      ref={newContainerNameRef}
                      placeholder={`Change container name from '${selectedContainer.name}'`}
                      className="flex-grow p-2 rounded border"
                    />
                    <div className="flex ml-2">
                      <Button className="rounded-full bg-green-300 hover:shadow-lg mx-1 p-1" onClick={() => { toggleContainerNameChangeDispatchSwitch(true) }}>
                        <Tick />
                      </Button>
                      <Button className="rounded-full bg-red-300 hover:shadow-lg mx-1 p-1" onClick={(e) => {
                        toggleChangeContainerName(false);
                        e.stopPropagation();
                      }}>
                        <Cancel />
                      </Button>
                    </div>
                  </div>
                  : <span className="text-lg font-semibold">{selectedContainer?.name || "Add containers on Account Page"}</span>
              }
            </div>
            <div className="mt-2 text-sm text-gray-300">No. of entries: {selectedContainer?.entries?.length || "None yet, start writing :)"}</div>
          </div>
        </Card>
    }
  </div>
  )
}