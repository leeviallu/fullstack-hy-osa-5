import PropTypes from 'prop-types'
import { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showAllInfo, setShowAllInfo] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addBlogLikes = (event) => {
    event.preventDefault()
    const addLike = blog.likes + 1
    updateBlog(blog.id,
      {
        ...blog,
        likes: addLike,
      }
    )
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div>
      { !showAllInfo ?
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setShowAllInfo(true)}>show</button>
        </div>
        :
        <div style={blogStyle}>
          {blog.title} <button onClick={() => setShowAllInfo(false)}>hide</button>
          <br/>
          {blog.author}
          <br/>
          {blog.url}
          <br/>
          {blog.likes} <button onClick={addBlogLikes}>like</button>
          <br />
          {
            user.username === blog.user.username ?
              <button onClick={() => removeBlog(user.token)}>remove</button>
              :
              null
          }
        </div>
      }
    </div>
  )
}
Blog.prototypes = {
  blog: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
}
export default Blog