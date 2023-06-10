import { Box ,Flex,Image,Text} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';

import AddContact from "./AddContact";
const Navbar = () => {
  return (
    <Box>
            <Flex
                 padding={"20px"}
        h="50px"
        align={"center"}
        justifyContent={"space-between"}
        pr={"30px"}
        fontSize={"19px"}
        bg={"black.300"}
        boxShadow={"lg"}
      >
        <Link to="/">
          {" "}
          <Image ml={"30px"} w={"50px"} src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-512.png" />
        </Link>
        <Flex alignItems={"center"} gap={"30px"}>
          <AddContact />
          <Link to="/bookmark">
            <Text>Bookmark Contact</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar