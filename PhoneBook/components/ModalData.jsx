import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Image,
  Box,
  Table,
  Tr,
  Tbody,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";

function ModalData({ name, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  console.log(data);
  return (
    <>
      <Text
        cursor={"pointer"}
        _hover={{ color: "red" }}
        fontSize={"18px"}
        onClick={onOpen}
      >
        {name}
      </Text>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} m="auto" w="450px">
            <Box>
              <Box m={"auto"} textAlign={"center"} mb={"10px"}>
                <Image
                  w="100px"
                  m="auto"
                  borderRadius={"50%"}
                  src={data.avatar}
                  alt="dummy url"
                />
                <Text fontWeight={"700"} fontSize={"17px"} mt="2px">
                  {data.name}
                </Text>
              </Box>
              <Box>
                <TableContainer>
                  <Table size="sm">
                    <Tbody
                      w={"50px"}
                      whiteSpace={"nowrap"}
                      overflowWrap={"anywhere"}
                      fontWeight={"500"}
                    >
                      <Tr>
                        <Td>Mobile No.:</Td>

                        <Td>{data.phone}</Td>
                      </Tr>
                      <Tr>
                        <Td>Label:</Td>

                        <Td>{data.lable}</Td>
                      </Tr>
                      <Tr>
                        <Td>Address:</Td>
                        <Td>{data.address}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </ModalBody>
          {/* <Button>Edit</Button> */}
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalData;
