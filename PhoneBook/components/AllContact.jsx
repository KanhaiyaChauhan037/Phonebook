// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Image,
//   Grid,
//   GridItem,
//   Text,
//   Input,
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   Flex,
// } from "@chakra-ui/react";
// import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
// import { bookMark, deletedata, getdata } from "../redux/Action";
// import { useDispatch, useSelector } from "react-redux";
// import EditContact from "./EditContact";
// import { debounce } from "lodash";
// import ModalData from "./ModalData";

// function AllContact() {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.get);
//   const loading = useSelector((state) => state.loading);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [modala, setmodala] = useState("");

//   useEffect(() => {
//     dispatch(getdata());
//   }, [dispatch]);

//   const handledelete = (id) => {
//     dispatch(deletedata(id));
//     alert("data delete success");
//   };

//   const handleSearch = debounce((value) => {
//     setSearchTerm(value);
//   }, 300);

//   const filteredData = data.filter((el) =>
//     el.name.toLowerCase().includes(searchTerm.toLowerCase())

//   );
//   // for sorting data by a to z ...

//   filteredData.sort((a, b) => a.name.localeCompare(b.name))

//   const Bookmark = (id) => {
//     const Books = data.find((el) => el.id === id);
//     dispatch(bookMark(Books));
//   };

//   const handledata = (id) => {
//    const modald = data.find((el) => el.id === id);
//     setmodala(modald);
//     //  console.log(modald);
//     };

//   if (loading) {
//     return (
//       <Box m={"auto"} textAlign={"center"}>
//         loading...{" "}
//         <Image src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/shot.gif" />{" "}
//       </Box>
//     );
//   }

//   return (
//     <Box mt={"4rem"}>
//       <Box mb={"1rem"}>
//         <Input
//           type="text"
//           placeholder="Search"
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </Box>
//       <Box>
//         <TableContainer>
//           <Table variant="striped" colorScheme="teal">
//             <TableCaption>All Contact </TableCaption>
//             <Thead>
//               <Tr>
//                 <Th>Name</Th>
//                 <Th>Number</Th>
//                 <Th>Action</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {filteredData.map((el) => (
//                 <Tr key={el.id}>
//                   <Td onClick={() => handledata(el.id)}>
//                     {" "}
//                     <ModalData data={modala} name={el.name} />
//                   </Td>
//                   <Td>{el.phone}</Td>
//                   <Td>
//                     <Flex
//                       w={"100px"}
//                       justifyContent={"space-between"}
//                       alignItems={"center"}
//                     >
//                       <EditContact id={el.id} />
//                       <Text
//                         cursor={"pointer"}
//                         onClick={() => handledelete(el.id)}
//                       >
//                         <DeleteIcon />
//                       </Text>
//                       <Text cursor={"pointer"} onClick={() => Bookmark(el.id)}>
//                         <StarIcon />
//                       </Text>
//                     </Flex>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// export default AllContact;

import React, { useEffect, useState } from "react";
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
  Alert,
  AlertIcon,
  useToast,
  Select,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  StarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";
import { bookMark, deletedata, getdata } from "../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import EditContact from "./EditContact";
import { debounce } from "lodash";
import ModalData from "./ModalData";

function AllContact() {
  const dispatch = useDispatch();
  const toast = useToast();
  const data = useSelector((state) => state.get);
  const loading = useSelector((state) => state.loading);
  const [modala, setmodala] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [filterd, setfilterd] = useState("");
  useEffect(() => {
    dispatch(getdata());
  }, [dispatch]);

  const handledelete = (id) => {
    dispatch(deletedata(id));
    toast({ title: "Contact Delete Successfully!", position: "top" });
  };

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLetterFilter = (letter) => {
    setSelectedLetter(letter);
  };

  const filteredData = data
    .filter((el) => el.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((el) =>
      selectedLetter ? el.name.toLowerCase().startsWith(selectedLetter) : true
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const lasti = currentPage * contactsPerPage;
  const firsti = lasti - contactsPerPage;
  const currentContacts = filteredData.slice(firsti, lasti);

  const Allfilterd = currentContacts.filter((item) => {
    if (filterd) {
      return item.lable === filterd;
    } else {
      return true;
    }
  });
  const totalcontact = filteredData.length;

  console.log(totalcontact);

  const Bookmark = (id) => {
    const Books = data.find((el) => el.id === id);
    dispatch(bookMark(Books));
    // alert("added in bookmark")
    toast({ title: "Contact added to Bookmark", position: "top" });
  };

  const handledata = (id) => {
    const modald = data.find((el) => el.id === id);
    setmodala(modald);
  };

  if (loading) {
    return (
      <Box m={"auto"} textAlign={"center"}>
        <Image
          ml={"8rem"}
          mt={"2rem"}
          src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/shot.gif"
        />{" "}
      </Box>
    );
  }

  return (
    <Box mt={"4rem"}>
      <Box mb={"1rem"}>
        <Input
          m="auto"
          w="25rem"
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearch(e.target.value)}
          ml={"20rem"}
          borderColor={"1px solid teal"}
        />
      </Box>
      {/* <Box mb="1rem">
       
        {Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).map(
          (letter) => (
            <Button
              key={letter}
              variant={selectedLetter === letter ? "solid" : "outline"}
              size="sm"
              onClick={() => handleLetterFilter(letter)}
              mx={1}
            >
              {letter}
            </Button>
          )
        )}
      </Box> */}

      <Box>
        <Flex justifyContent={"space-between"}>
          <Text>Total:-{totalcontact}</Text>
          <Select
            w="100px"
            placeholder="Select lable"
            name="lable"
            value={filterd}
            onChange={(e) => setfilterd(e.target.value)}
          >
           
            <option value={"work"}>Work</option>
            <option value={"school"}>School</option>
            <option value={"friend"}>Friend </option>
            <option value={"family"}> Family</option>
          </Select>
        </Flex>
        <TableContainer boxShadow={"md"}>
          <Table variant="striped" colorScheme="gray">
            <TableCaption>All Contacts {totalcontact}</TableCaption>
            <Thead>
              <Tr>
                <Th>Picture</Th>
                <Th>Name</Th>
                <Th>Number</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Allfilterd.map((el) => (
                <Tr key={el.id}>
                  <Td>
                    <Image w="35px" borderRadius={"50%"} src={el.avatar} />
                  </Td>
                  <Td onClick={() => handledata(el.id)}>
                    {" "}
                    <ModalData data={modala} name={el.name} />
                  </Td>
                  <Td>{el.phone}</Td>
                  <Td>
                    <Flex
                      w={"100px"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <EditContact id={el.id} />
                      <Text
                        cursor={"pointer"}
                        onClick={() => handledelete(el.id)}
                      >
                        <DeleteIcon />
                      </Text>
                      <Text cursor={"pointer"} onClick={() => Bookmark(el.id)}>
                        <StarIcon />
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box
        display="flex"
        justifyContent="space-between"
        // border="1px solid red"
        w="150px"
        m="auto"
        mt="2rem"
        alignItems={"center"}
      >
        <button
          variant="outline"
          size="sm"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon />
        </button>
        <Text
          bg={"black"}
          color={"white"}
          fontSize={"18px"}
          w="30px"
          textAlign={"center"}
        >
          {currentPage}
        </Text>
        <button
          variant="outline"
          size="sm"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={lasti >= filteredData.length}
        >
          <ArrowRightIcon />
        </button>
      </Box>
    </Box>
  );
}

export default AllContact;
