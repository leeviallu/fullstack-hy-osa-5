import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: 'Paras blogi',
  }
  const loggedUser = {
    username: 'leeviallu',
    password: 'S@lasana'
  }

  render(<Blog blog={blog} user={loggedUser} />)

  const element = screen.getByText('Paras blogi')
  expect(element).toBeDefined()
})

test('renders all blog info', async () => {
  const blog = {
    title: 'Paras blogi',
    url: 'www.paras.fi',
    author: 'Leevi Leppänen',
    likes: 0,
    user: {
      username: 'leeviallu',
    }
  }
  const loggedUser = {
    username: 'leeviallu',
    password: 'S@lasana'
  }

  render(<Blog blog={blog} user={loggedUser} />)


  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const authorElement = screen.getByText(/Leevi Leppänen/)
  expect(authorElement).toBeDefined()
  const urlElement = screen.getByText(/www.paras.fi/)
  expect(urlElement).toBeDefined()
  const likesElement = screen.getByText(/0/)
  expect(likesElement).toBeDefined()
})


test('like button is clicked twice', async () => {
  const blog = {
    title: 'Paras blogi',
    url: 'www.paras.fi',
    author: 'Leevi Leppänen',
    likes: 0,
    user: {
      username: 'leeviallu',
    }
  }
  const loggedUser = {
    username: 'leeviallu',
    password: 'S@lasana'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={loggedUser} updateBlog={mockHandler} />
  )



  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})