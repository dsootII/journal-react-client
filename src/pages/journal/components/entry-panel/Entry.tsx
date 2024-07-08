import createAxiosInstance from "../../../../lib/customAxios";
import { useJournalContext } from "../../../../lib/context/JournalContext";
import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "../../../../lib/config";
import TitleBox from "./TitleBox";
import InputBox from "./InputBox";
import { Button } from "@radix-ui/themes";


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
  // h-screen w-screen flex bg-gradient-to-r from-white to-stone-800
  return (
    <div className="flex-grow bg-gradient-to-t from-stone-700 to-stone-100 ">
      <TitleBox />
      <InputBox />
      <div className="flex justify-end py-2 pr-5">
        <div className="flex h-full items-center">
          <Button
            className="px-2 mx-1 hover:bg-green-700 h-[35px] rounded"
            onClick={handleThoughtConclusion}
          >
            Perish
          </Button>
          <Button
            className="px-2 mx-1 hover:bg-red-700 h-[35px] rounded"
            onClick={handlePerish}
          >
            Perish
          </Button>
        </div>
      </div>
    </div>
  )
}