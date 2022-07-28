import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('form calls the event handler', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const button = screen.getByText('save')

  await user.click(button)
  await user.type(titleInput, 'title test')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'http')

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('title test')
  expect(createBlog.mock.calls[0][1]).toBe('author')
  expect(createBlog.mock.calls[0][2]).toBe('http')
})
