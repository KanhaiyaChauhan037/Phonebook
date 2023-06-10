import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookFetch } from "../redux/Action";
import {
  Box,
  Button,
  Image,
  Grid,
  GridItem,
  Text,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  useToast,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { deletebook } from "../redux/Action";
function AllBookmarks() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Book);
  const loading = useSelector((state) => state.loading);
  const toast= useToast()
  console.log(data);
  data.sort((a, b) => a.name.localeCompare(b.name));
  useEffect(() => {
    dispatch(bookFetch());
  }, [dispatch]);

  const totalB = data.length;
  const handledelete = (id) => {
    dispatch(deletebook(id));
    toast({ title: "Contact Delete Successfully!", position: "top" });
  };

  if (loading) {
    return (
      <Box m={"auto"}>
        <Image
          ml={"25rem"}
          mt={"2rem"}
          src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif"
        />{" "}
      </Box>
    );
  }
  return (
    <Box>
      <Box>
        <TableContainer w="80%" m="auto" mt="10px" boxShadow={"xl"}>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>All Contact {totalB} </TableCaption>
            <Thead>
              <Tr>
                <Th>Picture</Th>
                <Th>Name</Th>
                <Th>Number</Th>
                <Th>Label</Th>
                <Th>Address</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((el) => (
                <Tr key={el.id}>
                  <Td>
                    <Image w="35px" borderRadius={"50%"} src={el.avatar} />
                  </Td>
                  <Td>
                    {" "}
                    <Flex>
                      <Text fontWeight={"bold"}>{el.name.charAt(0)}</Text>
                      {el.name.substring(1)}
                    </Flex>
                  </Td>
                  <Td>{el.phone}</Td>
                  <Td>{el.lable}</Td>
                  <Td>{el.address}</Td>
                  <Td>
                      <Text cursor={"pointer"} onClick={() => handledelete(el.id)}>
                    <DeleteIcon />
                  </Text>
                  </Td>
                
                  <Td>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AllBookmarks;
