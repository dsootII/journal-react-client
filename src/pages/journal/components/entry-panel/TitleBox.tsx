// import { TextField } from "@radix-ui/themes";
import { useJournalContext } from "../../../../lib/context/JournalContext";


export default function TitleBox() {

  //for now turning this into an entry for title. 
  const {currentThoughtTitle, setCurrentThoughtTitle} = useJournalContext();

  return (
    <div className="flex justify-between pt-2 pb-1">
      {/* <TextField.Root 
        className="w-full"
        color="iris"
        variant="surface"
        placeholder="You need to give a title to conclude.."
        value={currentThoughtTitle}
        onChange={(e) => setCurrentThoughtTitle(e.target.value)}
      > */}
        <input
          type="text"
          className="w-full font-bold p-2 bg-transparent border-none focus:outline-none text-lg"
          placeholder="You need to give a title to conclude.."
          value={currentThoughtTitle}
          onChange={(e) => setCurrentThoughtTitle(e.target.value)}
        />
      {/* </TextField.Root> */}
    </div>
  
  )
}