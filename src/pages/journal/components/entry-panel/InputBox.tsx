import { TextArea } from "@radix-ui/themes";
import { useJournalContext } from "../../../../lib/context/JournalContext";

export default function InputBox () {

  const {currentThought, setCurrentThought, selectedContainer} = useJournalContext();

  console.log(selectedContainer);

  return (
    <TextArea
      className="w-full h-3/4 overflow-visible p-4 bg-gray-100 shadow-xl text-md"
      placeholder="Place your thoughts here."
      value={currentThought}
      onChange={(e) => setCurrentThought(e.target.value)}
      variant="soft"
      color="amber"
    />
  )
}