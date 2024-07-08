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
    <div className="h-1/6" >

      {
        (containerList.length === 0) ?
          <Card className="h-full bg-stone-400 p-5"><em>You have no containers yet!</em></Card>
          :
          <Card className="bg-stone-400 hover:bg-stone-600 h-full border-none rounded-none" onClick={() => toggleChangeContainerName(true)}>
            <div>
              <div >
                {
                  changeContainerName ?
                    <div className="flex px-1 items-center justify-end z-10">
                      <TextField.Root
                        type="text"
                        ref={newContainerNameRef}
                        placeholder={`change container name from '${selectedContainer.name}'`}
                      />
                      <div className="flex">
                        <Button className="rounded-full bg-green-300 hover:shadow-lg mx-1 p-1" onClick={() => { toggleContainerNameChangeDispatchSwitch(true) }}><Tick /></Button>
                        <Button className="rounded-full bg-red-300 hover:shadow-lg mx-1 p-1" onClick={(e) => {
                          toggleChangeContainerName(false);
                          e.stopPropagation();
                        }}
                        >
                          <Cancel />
                        </Button>
                      </div>
                    </div>
                    : selectedContainer?.name || "Add containers on Account Page"
                }


              </div>
              <div>No. of entries: {selectedContainer?.entries?.length || "None yet, start writing :)"}</div>
            </div>
          </Card>
      }

    </div>
  )
}