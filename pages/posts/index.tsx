import React, { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import Post from "../../components/Post"
import { setPosts, url } from "../../redux/action-creators/posts"
import { IsinglePost } from "../../redux/types/postsType"
import {
  SPostsWrapper,
  SSinglePost,
  SPostsMainTitle,
  SAddNewPostsButton,
} from "../../styled-components/styled-posts"
import Link from "next/link"

interface IHomeProps {
  posts: IsinglePost[]
}

export default function Posts({ posts }: IHomeProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPosts(posts))
  }, [posts, dispatch])

  return (
    <div>
      <SPostsMainTitle>Posts</SPostsMainTitle>
      <Link href="/posts/new" passHref>
        <SAddNewPostsButton>add new post</SAddNewPostsButton>
      </Link>
      <SPostsWrapper>
        {posts.map((post: IsinglePost) => {
          return (
            <SSinglePost key={post.id}>
              <Post post={post} />
            </SSinglePost>
          )
        })}
      </SPostsWrapper>
    </div>
  )
}

export async function getStaticProps() {
  const response = await axios.get(`${url}/posts`)

  return {
    props: {
      posts: response.data,
    },
  }
}
