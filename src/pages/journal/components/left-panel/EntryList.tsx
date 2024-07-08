import { useJournalContext } from "../../../../lib/context/JournalContext";
import { Entry } from "../../../../lib/types";
import { Card } from "@radix-ui/themes";
import { ContainerDropdown } from "./ContainerDropdown";

export default function EntryList () {

  const {
    setSelectedContainer, 
    selectedContainer, 
    containerList,
    setCurrentThought,
    setCurrentThoughtTitle,
    setSelectedEntry,
    selectedEntry
  } = useJournalContext();

  function handleEntryClick(entry: Entry) {
    setCurrentThought(entry.body);
    setCurrentThoughtTitle(entry.title);
    setSelectedEntry(entry)
  }

  if (containerList.length === 0) {
    return <div className="p-3 font-bold">Add containers on the Account Page to start journaling!</div>
  }

  const entriesReversed = [...selectedContainer.entries].reverse(); //to show the latest first

  return (
    <div className="h-5/6 flex flex-col ">
      <Card className="flex flex-col h-full border-none">
        <div className="shadow-sm bg-stone-500">
          <div>
            <div className="flex justify-between px-2 items-center">
              <h3>Entries</h3>
              <ContainerDropdown containerList={containerList} setSelectedContainer={setSelectedContainer} />    
            </div>
            
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-stone-700 scrollbar scrollbar-thumb-stone-800">
          <div>
            {
              entriesReversed.map((entry) => {
                return (
                  <Card
                    className={
                      ((selectedEntry && (entry.id === selectedEntry.id)) ? "bg-stone-400 my-2 hover:bg-stone-500"
                        : "bg-stone-200 my-2 hover:bg-stone-300") +
                      "hover:shadow-lg hover:bg-stone-300 active:bg-stone-500 focus:border focus:border-black"
                    }
                    key={entry.id}
                    onClick={() => handleEntryClick(entry)}
                  >
                    <div>
                      <div className="text-lg">{entry.title}</div>
                    </div>
                    <div className="overflow-hidedn"> {entry.body} </div>
                    <div className="text-sm font-extralight">Created on {entry.created_at.slice(0, 10)}</div>
                  </Card>
                )
              })
            }            
          </div>
        </div>
      </Card>
    </div>
  )
}