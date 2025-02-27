import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../LayOut/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import AddSlot from "../Pages/AddSlot/AddSlot";
import AllSlots from "../Pages/AllSlots/AllSlots";
import MySlots from "../Pages/MySlots/MySlots";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageSlot from "../Pages/ManageSlot/ManageSlot";
import MySlotList from "../Pages/MySlotList/MySlotList";
import UpdateSlots from "../Pages/MySlotList/UpdateSlots";
import About from "../Pages/About/About";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/about',
        element:<About></About>
      },
      // Admin------------------------------->
      {
        path: '/add-slot',
        element:<PrivateRoute><AdminRoute> <AddSlot></AddSlot></AdminRoute></PrivateRoute>
      },

      {
        path: '/all-slots',
        element: <PrivateRoute><AllSlots></AllSlots></PrivateRoute>
      },
      {
        path: '/manage-slot',
        element: <PrivateRoute><AdminRoute><ManageSlot></ManageSlot></AdminRoute></PrivateRoute>
      },
      {
        path: '/my-slot-list',
        element: <PrivateRoute><MySlotList></MySlotList></PrivateRoute>
      },
      {
        path: '/update-slots/:id',
        element: <PrivateRoute><UpdateSlots></UpdateSlots></PrivateRoute>
      },

  //  Customer------------------------------------------->
      {
        path: '/my-slot',
        element: <PrivateRoute><MySlots></MySlots></PrivateRoute>
      },



      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <SignUp></SignUp>
      }
    ]
  },
]);