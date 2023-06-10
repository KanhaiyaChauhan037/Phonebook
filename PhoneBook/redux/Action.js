import { Add, Getdata, Deletedata, Editdata,loading,Bookmark,Book_fetch, Book_delete } from "./ActionType";

import axios from "axios";

export const adddata = (add) => async (dispatch) => {
    
     try {
          const res = await axios.post("https://json-s.onrender.com/users", add);
          dispatch({ type: Add, payload: res.data })
     } catch (error) {
          console.log("error")
     }
}
export const getdata = () => async (dispatch) => {
     dispatch({ type: loading });
     try {
          const res = await axios.get("https://json-s.onrender.com/users");
          dispatch({ type: Getdata, payload: res.data })
     } catch (error) {
          console.log("error")
     }
}
export const deletedata = (id) => async (dispatch) => {
     try {
          const res = await axios.delete(`https://json-s.onrender.com/users/${id}`,);
          dispatch({ type: Deletedata, payload: id })
     } catch (error) {
          console.log("error")
     }
}
export const editdata = (id, Add) => async (dispatch) => {
     try {
          const res = await axios.patch(`https://json-s.onrender.com/users/${id}`,Add);
          dispatch({ type: Editdata, payload: res.data })
          console.log("Action")
     } catch (error) {
          console.log("error")
     }
}

// Bookmark section

export const bookMark = (Books) => async (dispatch) => {
     try {
          const res = await axios.post(`https://json-s.onrender.com/bookmarks`,Books);
          dispatch({ type: Bookmark, payload: res.data })
          console.log("Action", Books)
     } catch (error) {
          console.log("error",Books)
     }
}

export const bookFetch = () => async (dispatch) => {
     try {
          const res = await axios.get(`https://json-s.onrender.com/bookmarks`);
          dispatch({ type: Book_fetch, payload: res.data })
          console.log("Action", res)
     } catch (error) {
          console.log("error")
     }
}
export const deletebook = (id) => async (dispatch) => {
     try {
          const res = await axios.delete(`https://json-s.onrender.com/bookmarks/${id}`,);
          dispatch({ type: Book_delete, payload: id })
     } catch (error) {
          console.log("error")
     }
}