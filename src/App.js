import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SelectedTodo from "./components/SelectedTodo";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { update } from "firebase/database";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [userIDState, setUserIDState] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserIDState(user.uid);
        await fetchTodos(user.uid);
        console.log(tasks);
      } else {
        setUserIDState(null);
        setTasks([]);
      }
    });
    
    return () => unSubscribe();
  }, []);

  const fetchTodos = async (userID) => {
    const q = query(collection(db, "todos"), where("user", "==", userID));
    const querySnapShot = await getDocs(q);

    const docs = querySnapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTasks(docs);
  };
  const addTask = async (todo) => {
    try {
      await addDoc(collection(db, "todos"), {
        user: userIDState,
        text: todo,
        completed: false,
        createdAt: new Date(),
      });
      toast.success("Todo added successfully!");
    } catch (error) {
      toast.error(error.message);
    }finally{
      fetchTodos(userIDState)
    }
  };

  const toggleTask = async (todoId, currentStatus) => {
    try {
      const todoDoc = doc(db, "todos", todoId)
      await updateDoc(todoDoc, {
        completed: !currentStatus
      });
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }finally{
      fetchTodos(userIDState)
    }
  };

  const removeTask = async (todoId) => {
    toast.loading("Deleting...")
    try {
      await deleteDoc(doc(db, "todos", todoId));
      toast.dismiss();

      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }finally{
      fetchTodos(userIDState)
    }

  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                tasks={tasks}
                addTask={addTask}
                toggleTask={toggleTask}
                removeTask={removeTask}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="/todo/:todoIndex"
            element={<SelectedTodo tasks={tasks} />}
          ></Route>
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
