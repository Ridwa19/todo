import React from 'react'
import NavItem from './NavItem'
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import useCurrentUser from "../hooks/useCurrentUser"
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Navbar = () => {
  const currentUser = useCurrentUser()

  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.info("You are logged out🙄")
      navigate("/signin")
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <nav className="flex justify-between bg-gray-200 p-3 shadow-md mb-3">
      <h1 className="hidden md:block text-2xl font-bold">TodoList App</h1>
      <ul className="hidden md:flex flex-col flex-1 md:flex-row items-center justify-center gap-2">
        {currentUser && <NavItem itemText={"Home"} itemPath={"/"} />}

      </ul>

      <div className="hidden md:flex  items-center">
        {currentUser ? (
          <button
            className="border-2 border-gray-500 px-2 rounded-md mr-2 hover:bg-gray-500 hover:text-white shadow-md"
            onClick={logOut}
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link
              className="border-2 border-gray-500 px-2 rounded-md mr-2 hover:bg-gray-500 hover:text-white shadow-md"
              to={"signin"}
            >
              SignIn
            </Link>
            <Link
              className="border-2 border-black px-2 rounded-md mr-2 bg-black text-white hover:bg-gray-800 hover:text-white shadow-md"
              to={"signup"}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className="w-full flex md:hidden justify-end mr-3">
        <Menu size={24} />
      </div>
    </nav>
  );
}

export default Navbar