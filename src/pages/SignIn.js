import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useCurrentUser from '../hooks/useCurrentUser'

const SignIn = () => {
  // Create form fields states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const currentUser = useCurrentUser()

  if(currentUser){
    toast.warning("First sign out😉")
    navigate("/")
  }



  // Create loading state
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password) return;

    // Start loading
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed In Successfully")
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false)
    }

  }
  return (
    <div className="flex justify-center">
      <form className="flex  flex-col w-full min-w-sm  mt-4 gap-2 max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 font-bold text-center ">Sign In</h1>
        <label>Username</label>
        <input
          type="email"
          className="p-2 border-2 border-gray-400 rounded-md "
          placeholder="badrudin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Passowrd</label>
        <input
          type="password"
          className="p-2 border-2 border-gray-400 rounded-md "
          placeholder="*************"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="flex bg-black text-white p-2 rounded-md justify-center "
        >
          { loading ? <Loader /> : (<p>Sign In</p>) }
        </button>
      </form>
    </div>
  );
}

export default SignIn