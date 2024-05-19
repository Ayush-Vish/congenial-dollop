import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DashBoard from './pages/DashBoard'
import { expect, test } from 'vitest'

test('renders DashBoard component', () => {
  render(<DashBoard />)

  // Check that the Header, AddProductComponent, and TableSortAndSelection components are rendered
  expect(screen.getByRole('header')).toBeInTheDocument()
  expect(screen.getByTestId('add-product-component')).toBeInTheDocument()
  expect(screen.getByTestId('table')).toBeInTheDocument()
})