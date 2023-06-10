import React,{useState} from "react";
import { Box, Input } from "@chakra-ui/react";
import { debounce } from "lodash";
import {  useSelector } from "react-redux";
const SearchContact = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state) => state.get);
  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const filteredData = data.filter((el) =>
    el.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box mb={"1rem"}>
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Box>
  );
};

export default SearchContact;
