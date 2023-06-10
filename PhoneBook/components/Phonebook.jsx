import React from "react";
import { Box } from "@chakra-ui/react";
import AllContact from "./AllContact";
function Phonebook() {
  return (
    <Box >
      <Box w={"80%"} m="auto">
        <AllContact />
      </Box>
    </Box>
  );
}

export default Phonebook;
