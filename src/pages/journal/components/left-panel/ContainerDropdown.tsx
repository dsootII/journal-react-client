import { Containers } from "../../../../lib/types";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Dispatch, SetStateAction } from "react";


export const ContainerDropdown: React.FC<{ 
  containerList: Containers,
  setSelectedContainer: Dispatch<SetStateAction<number>>, 
  // children: ReactNode 
}> = ({containerList, setSelectedContainer}) => {
  //receive containerList from LeftPanel. thoda propdrilling chalega. 
  //no useEffect required here. That's stupid. 

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" className="bg-stone-100 shadow-lg">All Containers</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">

        {
          containerList.map((container, index) => {
            return(
              <DropdownMenu.Item key={container.name} onClick={() => setSelectedContainer(index)}>
                {container.name}
              </DropdownMenu.Item>
          )})
        }

      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}