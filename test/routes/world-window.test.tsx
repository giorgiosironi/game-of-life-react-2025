import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import WorldWindow, { loader } from '../../app/routes/world-window';

describe('Hello World', () => {
  it('should pass a simple test', () => {
    expect(true).toBe(true);
  });
}); 

describe('WorldWindow', () => {
  it('renders with a link to another generation', async () => {
    const loaderData = loader({
      request: new Request('http://localhost/examples/blinker?generation=1')
    });
    const routes = [
      {
        path: '/examples/blinker',
        element: <WorldWindow 
          loaderData={loaderData}
          params={{}}
          matches={[
            {
              params: {},
              id: 'root',
              pathname: '/',
              data: undefined,
              handle: undefined
            },
            {
              params: {},
              id: 'routes/world-window',
              pathname: '/examples/blinker',
              data: loaderData,
              handle: undefined
            }
          ]}
        />
      }
    ];
    
    const router = createMemoryRouter(routes, {
      initialEntries: ['/examples/blinker?generation=1']
    });
    
    render(<RouterProvider router={router} />);
    
    // Check for the heading showing current generation
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Generation 1');
    
    // Check for the link to the other generation
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Switch to generation 2');
    expect(link).toHaveAttribute('href', '/examples/blinker?generation=2');
  });
}); 
