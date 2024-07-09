import { useJournalContext } from "../../../../lib/context/JournalContext";
import { Entry } from "../../../../lib/types";
import { Card, Flex } from "@radix-ui/themes";
import { ContainerDropdown } from "./ContainerDropdown";

export default function EntryList() {

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
    <div className="h-5/6 flex flex-col p-4">
    <div className="flex flex-col h-full border-none rounded-lg bg-gray-500">
      <div className="p-3 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Entries</h3>
          <ContainerDropdown containerList={containerList} setSelectedContainer={setSelectedContainer} />
        </div>
      </div>

      <Flex gap={'3'} direction={'column'} className="rounded-b-lg p-2 overflow-y-scroll scrollbar scrollbar-thumb-gray-800">
        {
          entriesReversed.map((entry) => (
            <div
              // variant="ghost"
              className={
                ((selectedEntry && (entry.id === selectedEntry.id)) ? "bg-gray-400 hover:bg-gray-500"
                  : "bg-gray-200 hover:bg-gray-300") +
                "my-2 p-3 rounded-lg cursor-pointer transition duration-300"
              }
              key={entry.id}
              onClick={() => handleEntryClick(entry)}
            >
              <div>
                <div className="text-lg font-medium text-gray-800">{entry.title}</div>
                <div className="overflow-hidden text-sm text-gray-700">
                  {entry.body}
                </div>
                <div className="text-xs font-extralight text-gray-600 mt-1">
                  Created on {entry.created_at.slice(0, 10)}
                </div>
              </div>
            </div>
          ))
        }
      </Flex>
    </div>
  </div>
  )
}
