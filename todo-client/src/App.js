import { useState } from "react";
import { Flex, Text, Input, InputGroup, Spacer, Center } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContract, useContractWrite, useWaitForTransaction } from 'wagmi';
import contractAbi from "./utils/abi.json";

 const contractAddress = "0xDf884d362E6EB5A6A26576AD5ad4677faC5A0364";

function App() {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  
  const { write: addTodoWrite, data: addTodoData, isLoading: addTodoLoading } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: contractAddress,
    abi: contractAbi,
    functionName: 'addTodo',
    args: [title, desc],
    onSuccess(data) {
      data.wait().then(() => {
        alert("Runs Successful");
      })
    },
    onError() {
      alert("Something went wrong")
    }
  })

  const { isLoading: addTodoWaitLoading } = useWaitForTransaction({
    hash: addTodoData?.hash,
    onSuccess() {
      alert("Add Todo is successful");
      setTitle("");
      setDesc("");
    },
    onError() {
      alert("Transaction Failed")
    }

  })

const handleAddTodo = () => {
  addTodoWrite();
}
  
  return (
    <Flex flexDir="column" justify="center" alignItems="center">
    <Text>Todo Dapp</Text>

    {/* Connect wallet button */}
    <ConnectButton />
    
    <Flex align={"center"} my={"3%"} px={"2%"}>
      <Text>Title</Text>
      <Spacer />
      <InputGroup
        _focus={{ boxShadow: "none" }}
        as="button"
        w={"70%"}
      >
        <Input
         value={title}
         onChange={(e) => {
          setTitle(e.target.value);
         }}
          placeholder="Enter title"
          borderRadius="0"
          borderWidth="0"
          _placeholder={{
            color: "#999999",
            justifySelf: "flex-end",
          }}
           />
         </InputGroup>
   </Flex>

   <Flex align={"center"} my={"3%"} px={"2%"}>
      <Text>Description</Text>
      <Spacer />
      <InputGroup
        _focus={{ boxShadow: "none" }}
        as="button"
        w={"70%"}
      >
        <Input
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
           }}
          placeholder="Enter Descritption"
          borderRadius="0"
          borderWidth="0"
          _placeholder={{
            color: "#999999",
            justifySelf: "flex-end",
          }}
           />
         </InputGroup>
       </Flex>


       <Center
        as={"button"}
        type="submit"
        bg={"black"}
        onClick={handleAddTodo}
        color={"white"}
        h={"50px"}
        cursor={"pointer"}
        disabled={
          addTodoWaitLoading || addTodoLoading
        }
      >
     <Text>
       { addTodoWaitLoading || addTodoLoading ? "adding...." : "Add Todo" }
     </Text>
     </Center>
</Flex>
  );
}

export default App;
