import createAxiosInstance from "../../../../lib/customAxios";
import { useJournalContext } from "../../../../lib/context/JournalContext";
import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "../../../../lib/config";
import TitleBox from "./TitleBox";
import InputBox from "./InputBox";
import { Button, Flex } from "@radix-ui/themes";


export default function Entry() {
  const [dbCallDataConclusion, setDbCallDataConclusion] = useState({});
  const {
    currentThought,
    currentThoughtTitle,
    setCurrentThought,
    setCurrentThoughtTitle,
    selectedContainer,
    setListUpdated,
    selectedEntry
  } = useJournalContext();

  // const [open, setOpen] = useState(false);
  const [perishSwitch, togglePerishSwitch] = useState(false);

  useEffect(() => {
    createAxiosInstance()
    .post(ENDPOINTS.createEntry, dbCallDataConclusion)
      .then(res => {
        console.log("entry creation response", res)
        // setOpen(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [dbCallDataConclusion])

  useEffect(() => {
    if (selectedEntry) {
      createAxiosInstance().delete(ENDPOINTS.createEntry + `${selectedEntry.id}/`)
        .then(res => {
          console.log(res?.data);
          setListUpdated(true);                             
        })
        .catch(err => console.log(err))
    }

    return () => togglePerishSwitch(false)
  }, [perishSwitch])

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      togglePerishSwitch(false);
    }
  }, []);

  const timerRef = useRef(0);

  function handleThoughtConclusion() {
    const data = {
      title: currentThoughtTitle,
      body: currentThought,
      container: selectedContainer.id 
    }
    setDbCallDataConclusion(data);

    // setOpen(true);
    // window.clearTimeout(timerRef.current);
    // timerRef.current = window.setTimeout(() => {
    //   setOpen(false);
    // }, 100);
    setCurrentThought('');
    setCurrentThoughtTitle('');
    setListUpdated(true);
  }

  function handlePerish() {
    let alertMessage = "Are you sure?"
    if (confirm(alertMessage)) {
      setCurrentThought('');
      setCurrentThoughtTitle('');
      togglePerishSwitch(true);
    }
  }
  // h-screen w-screen flex bg-gradient-to-r from-white to-gray-800
  // bg-gradient-to-t from-gray-700 to-gray-100
  return (
    <div className="flex-grow  ">
      <TitleBox />
      <InputBox />
      <div className="flex justify-end py-2 pr-5">
        <Flex gap={'2'} align={'center'} className="flex h-full items-center">
          <Button
            className="px-2 mx-1 hover:bg-green-800 h-[35px] rounded"
            onClick={handleThoughtConclusion}
            size={'4'}
            color="iris"
          >
            Conclude
          </Button>
          <Button
            className="px-2 mx-1 hover:bg-red-800 h-[35px] rounded"
            onClick={handlePerish}
            size={'4'}
            color="iris"
          >
            Perish
          </Button>
        </Flex>
      </div>
    </div>
  )
}