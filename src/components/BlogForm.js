import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      title:
      <input
        id='title-input'
        value={newBlogTitle}
        onChange={(event) => setNewBlogTitle(event.target.value)}
      />
      <br />
      author:
      <input
        id='author-input'
        value={newBlogAuthor}
        onChange={(event) => setNewBlogAuthor(event.target.value)}
      />
      <br />
      url:
      <input
        id='url-input'
        value={newBlogUrl}
        onChange={(event) => setNewBlogUrl(event.target.value)}
      />
      <br />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm