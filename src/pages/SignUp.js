import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from "../firebaseConfig"
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const SignUp = () => {
  // Create form fields states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Create loading state
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User created successfully");
      navigate("/")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center">
      <form
        className="flex  flex-col w-full min-w-sm  mt-4 gap-2 max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl mb-2 font-bold text-center ">Register</h1>
        <label>Email</label>
        <input
          type="text"
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
          className="flex bg-black text-white p-2 rounded-md justify-center"
        >
          {loading ? <Loader /> : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp