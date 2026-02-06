import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Edit from './pages/Edit'

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AppLayout/>,
      children:[
        {
          index:true,
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/profile/:username',
          element:<Profile/>
        },
        {
          path:'/profile/edit/:id',
          element:<Edit/>
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
