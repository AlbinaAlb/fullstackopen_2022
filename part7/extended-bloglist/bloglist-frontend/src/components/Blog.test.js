import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://www.test.com/',
    likes: 0,
    user: {
      username: 'username',
      name: 'name',
    },
  }
  let component
  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={likeMockHandler} />
    )
  })

  test('renders the blog title and author, but not url or likes by default', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    )
    expect(component.container.querySelector('.url')).not.toBeInTheDocument()
    expect(component.container.querySelector('.likes')).not.toBeInTheDocument()
  })

  test('blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(component.container.querySelector('.url')).toBeInTheDocument()
    expect(component.container.querySelector('.likes')).toBeInTheDocument()
  })

  test('if the Like button is clicked twice, the event handler is also called twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})
