import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Select,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { adddata } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { AddIcon } from "@chakra-ui/icons";

const initd = {
  name: "",
  avatar: "",
  phone: "",
  address: "",
  lable: "",
};

function AddContact() {
  const [Add, SetAdd] = useState(initd);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const { name, avatar, phone, address, lable } = Add;

  const handlechange = (e) => {
    SetAdd({
      ...Add,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    if (!name || !avatar || !phone || !address || !lable) {
      toast({
        title: "Please fill in all required fields",
        position: "top",
        variant: "top-accent",
        bg: "red.200",
      });
    } else {
      dispatch(adddata(Add));
      onClose();
      toast({
        title: "Contact Added Successfully!",
        position: "top",
        variant: "top-accent",
        bg: "blue.200",
      });
    }
    SetAdd({
      name: "",
      avatar: "",
      address: "",
      phone: "",
      lable:""
    })
  };

  return (
    <Box>
      <Box>
        <Text cursor={"pointer"} onClick={onOpen}>
          <Flex alignItems={"center"} gap="3px">
            {" "}
            <AddIcon /> Add{" "}
          </Flex>
        </Text>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="enter your Name"
                name="name"
                value={name}
                onChange={handlechange}
              />

              <FormLabel>Avatar</FormLabel>
              <Input
                placeholder="Avatar"
                type="url"
                name="avatar"
                value={avatar}
                onChange={handlechange}
              />

              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="enter Number"
                name="phone"
                value={phone}
                onChange={handlechange}
              />

              <FormLabel>Address</FormLabel>
              <Input
                placeholder="enter Address"
                name="address"
                value={address}
                onChange={handlechange}
              />

              <FormLabel>Label</FormLabel>
              <Select
                placeholder="Select lable"
                name="lable"
                value={lable}
                onChange={handlechange}
              >
                <option value={"work"}>Work</option>
                <option value={"school"}>School</option>
                <option value={"friend"}>Friend</option>
                <option value={"family"}>Family</option>
              </Select>
            </FormControl>
          </ModalBody>
          <Button
            bg="green.400"
            w="140px"
            color={"white"}
            m={"auto"}
            _hover={{ bg: "green", color: "white" }}
            onClick={handleAdd}
          >
            <AddIcon mr={"5px"} />
            Save
          </Button>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddContact;
