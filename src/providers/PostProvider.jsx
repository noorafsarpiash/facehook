import { PostContext } from "../context";
import { useReducer } from "react";
import { initialState, postReducer } from "../reducers/PostReducer";

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postReducer, initialState)

    return (
        <PostContext.Provider value={{ state, dispatch }}>
            {children}
        </PostContext.Provider>
    )
}
export default PostProvider;