import { useEffect, useState } from "react";
import { useUserContext } from "../../../lib/context/UserContext";
import createAxiosInstance from "../../../lib/customAxios";
import { ENDPOINTS } from "../../../lib/config";
import * as Dialog from '@radix-ui/react-dialog';
// import { Button } from "@radix-ui/themes";
import { Label } from "@radix-ui/react-label";


export default function Modal({ isModalOn, handleModalOpening, newContainerName, setNewContainerName }: any) {
  
  enum statusType { not_submitted, is_submitting, successful, failed };
  const {userDetails, setContainersUpdated} = useUserContext();
  console.log("User details in Modal", userDetails);
 
  //status will be 'not submitted'||'is submitting'||'successful'||'failed'
  const [status, setStatus] = useState<statusType>(statusType.not_submitted);

  useEffect( () => {
    
    if (status === statusType.is_submitting) {
      //ready data to send to server
      const data = {
        name: newContainerName,
        user: userDetails.user.id
      }
      //make request
      createAxiosInstance()
      .post(ENDPOINTS.createContainers, data)
      .then(res => {
        console.log(res.data);
        setStatus(statusType.successful);
        setNewContainerName('');
        setContainersUpdated(true);
      })
    }

    return () => setStatus(statusType.not_submitted)

  }, [status])



  return (
    <Dialog.Root open={isModalOn} onOpenChange={handleModalOpening}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className='flex justify-between'> 
              <Dialog.Title className="text-xl font-semibold mb-4">Add Container</Dialog.Title>
              <Dialog.Close asChild>
                <button 
                  className="p-2 hover:bg-gray-600 shadow-sm rounded-md hover:text-white"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
            
            <Dialog.Description className="mb-4">
              Enter a name for your container.
            </Dialog.Description>
            <Label className="block mb-2">Name:</Label>
            <input 
              className="w-full bg-white mb-4 p-2 rounded-md" 
              value={newContainerName} 
              placeholder='container name...'
              onChange={(e) => setNewContainerName(e.target.value)} 
            />
            <div className="flex justify-end">
            <Dialog.Close asChild>
              <button
                className="p-2 bg-green-400 hover:bg-green-600 shadow-sm rounded-md hover:text-white"
                color="jade"
                onClick={ () => setStatus(statusType.is_submitting) }
              >
                Save
              </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}