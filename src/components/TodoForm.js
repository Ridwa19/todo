import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";

const TodoForm = ({ addTask }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("Todo text cannot be empty!");
      return;
    }
    setLoading(true);
    await addTask(value);
    setLoading(false);
    setValue("");
  };

  return (
    <form
      className="flex flex-col mb-4 mt-4 w-full max-w-sm gap-2"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Todo Form</h1>
      <div className="flex flex-col">
        <label className="font-bold">Todo Text:</label>
        <input
          type="text"
          className="p-2 border-2 border-gray-400 rounded-md "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add todo"
        />
      </div>
      <button type="submit" className="flex justify-center bg-black text-white p-2 rounded-md">
        {loading ? <Loader /> : <p>Add</p>}
      </button>
    </form>
  );
};

export default TodoForm;
