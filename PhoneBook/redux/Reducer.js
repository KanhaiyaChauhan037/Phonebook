
import { Add, Getdata, Deletedata, Editdata, Bookmark, Book_fetch, Book_delete } from "./ActionType";

const initialState = {
  loading: true,
  get: [],
  Book: [],
  BookFetch: []
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case Add: {
      return {
        ...state,
        get: [...state.get, action.payload]
      };
    }
    case Getdata: {
      return {
        ...state,
        get: action.payload,
        loading: false,

      };
    }
    case Deletedata: {
      return {
        ...state,
        get: state.get.filter((el) => el.id !== action.payload),
      };
    }
    case Editdata: {
      const updatedData = state.get.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        get: updatedData,
      };
    }
    case Bookmark: {
      return {
        ...state,
        Book: [...state.Book, action.payload]
      };
    }
    case Book_fetch: {
      return {
        ...state,
        Book: action.payload,
        loading: false
      };
    }
    case Book_delete: {
      return {
        ...state,
        Book: state.Book.filter((el) => el.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
