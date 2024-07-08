import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import { AuthProvider } from './lib/context/AuthContext';
import AuthOutlet from './pages/AuthOutlet';
import JournalPage from './pages/journal/JournalPage';
import AccountPage from './pages/account/AccountPage';
import { JournalProvider } from './lib/context/JournalContext';
import { UserProvider } from './lib/context/UserContext';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage /> 
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/user',
    element: <AuthOutlet />,
    //children lagega idhar
    children: [
      {
        path: '/user/journal',
        element: (
          <JournalProvider>
            <JournalPage />
          </JournalProvider>
        ) 
      },
      {
        path: '/user/account',
        element: (
          <UserProvider>
            <AccountPage />
          </UserProvider>
        )
      }
    ],
  }
])




function App() {
  return  <RouterProvider router={router} />
}

export default App
