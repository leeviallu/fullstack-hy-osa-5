import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
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
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:
      <input
        value={newBlogTitle}
        onChange={({ target })=> setNewBlogTitle(target.value)}
      />
      author:
      <input
        value={newBlogAuthor}
        onChange={({ target })=> setNewBlogAuthor(target.value)}
      />
      url:
      <input
        value={newBlogUrl}
        onChange={({ target })=> setNewBlogUrl(target.value)}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <Notification message={notificationMessage} />
      {
        user ?
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={() => logOut()}>log out</button>
          {blogForm()}
          
          <BlogList blogs={blogs} />
        </div>
        :
        loginForm()
      }
    </div>
  )
}

export default App