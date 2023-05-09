import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('function is called with right info', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog}/>)
  const inputTitle = container.querySelector('#title-input')
  const inputAuthor = container.querySelector('#author-input')
  const inputUrl = container.querySelector('#url-input')
  const showButton = screen.getByText('save')

  await user.type(inputTitle, 'testiTitle')
  await user.type(inputAuthor, 'testiAuthor')
  await user.type(inputUrl, 'testiUrl')
  await user.click(showButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testiTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testiAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('testiUrl')
})