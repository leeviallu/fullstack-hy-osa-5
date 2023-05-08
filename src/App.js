import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addBlogLikes = async (id, blogObject) => {
    const newBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : newBlog))
    fetchBlogs()
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    fetchBlogs()
  }

  const blogFormRef = useRef()
  return (
    <div>
      <Notification message={notificationMessage} />
      {
        user ?
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
              <button onClick={() => {
                window.localStorage.removeItem('loggedBlogappUser')
                window.location.reload()
              }}>
            log out
              </button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
            {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map((blog, i) =>
              <Blog
                key={i}
                blog={blog}
                updateBlog={addBlogLikes}
                deleteBlog={deleteBlog}
                user={user}
              />
            )}
          </div>
          :
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
      }
    </div>
  )
}

export default App