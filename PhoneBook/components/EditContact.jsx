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
  Text,useToast
} from "@chakra-ui/react";
import {EditIcon  } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { editdata } from "../redux/Action";

const initd = {
  name: "",
  avatar: "",
  phone: "",
  address: "",
  lable: "",
};
const EditContact = ({ id }) => {
  const [Add, SetAdd] = useState(initd);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.get);
  // console.log("edit", data);
  const toast = useToast()
  
  useEffect(() => {
    const contact = data.find((contact) => contact.id === id);
    if (contact) {
      SetAdd({ ...contact });
    }
  }, [data, id]);

  const { name, avatar, phone, address, lable } = Add;

  const handlechange = (e) => {
    SetAdd({
      ...Add,
      [e.target.name]: e.target.value,
    });
  };
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleEdit = () => {
    dispatch(editdata(id, Add));
    console.log(Add);
 toast({ title: "Contact Edit successfully", position: "top" });
    onClose();
  };

  return (
    <>
      <Text cursor={"pointer"} onClick={onOpen}>
        <EditIcon />
      </Text>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Contact</ModalHeader>
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
                placeholder="Avatart"
                type="url "
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
              <FormLabel>Lable</FormLabel>
              <Select
                placeholder="Select lable"
                name="lable"
                value={lable}
                onChange={handlechange}
              >
                <option value={"work"}>Work</option>
                <option value={"school"}>School</option>
                <option value={"friend"}>Friend </option>
                <option value={"family"}> Family</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditContact;
