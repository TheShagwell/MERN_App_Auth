import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'

// importing the routes
import Username from './components/Username';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import Password from './components/Password';
import PageNotFound from './components/PageNotFound';

// The Auth middleware to protect each routes to prevent users to access any page without login to the app
import { AuthorizeUser, ProtectRoute } from './middleware/auth';


const helmetContext = {};

// Routers
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username/>,
    // errorElement: <PageNotFound/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path: '/recovery',
    element: <Recovery/>
  },
  {
    path: '/reset',
    element: <Reset/>
  },
  {
    path: '/password',
    element: <ProtectRoute><Password/></ProtectRoute> 
  },
  {
    path: '*',
    element: <PageNotFound/>
  },
])

function App() {  
  return (
        <HelmetProvider context={helmetContext}>
          <main>
                <RouterProvider router={router} />
          </main>
        </HelmetProvider>
  )
}

export default App
