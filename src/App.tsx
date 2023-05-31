import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home,Workers } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/workers',
    element: <Workers />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
