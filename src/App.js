import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }
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
          <Togglable buttonLabel="new note">
            <BlogForm 
              addBlog={addBlog} 
              newBlogTitle={newBlogTitle}
              handeNewBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
              newBlogAuthor={newBlogAuthor}
              handeNewBlogAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
              newBlogUrl={newBlogUrl}
              handeNewBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </div>
        :
        <LoginForm 
          handleLogin={handleLogin}
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