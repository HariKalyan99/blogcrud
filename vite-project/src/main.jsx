import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Routes/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Featurepost from './components/Featurepost'
import Createpost from './components/Createpost'
import Displayposts from './components/Displayposts'

const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    {path: "/", element: <Createpost />},
    {path: "/displaypost", element: <Displayposts />},
    {path: "/featurepost", element: <Featurepost />},
  ]},
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
