import React from 'react'
import { useEffect } from 'react'
import useAxios from "../hooks/useAxios"
import { usePost } from "../hooks/usePost"
import { actions } from '../actions'
import PostList from "../posts/PostList"
import NewPost from '../posts/NewPost'

const HomePage = () => {
    const { state, dispatch } = usePost()
    const { api } = useAxios();

    useEffect(() => {
        dispatch({ type: actions.post.DATA_FETCHING })

        const fetchPost = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`)
                if (response.status === 200) {
                    dispatch({ type: actions.post.DATA_FETCHED, data: response.data })

                }
            } catch (error) {
                console.error(error)
                dispatch({ type: actions.post.DATA_FETCHED_ERROR, error: error.message })
            }
        }
        fetchPost();
    }, [])

    if (state?.loading) {
        return <div>We are working...</div>
    }
    if (state?.error) {
        return <div>Error in fatching posts{state?.error?.message}</div>
    }

    return (
        <div>
            <NewPost />
            <PostList posts={state?.posts} />
        </div>
    )
}

export default HomePage