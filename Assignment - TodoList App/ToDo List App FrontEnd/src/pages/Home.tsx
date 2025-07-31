import axios from "axios"
import React, { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { IoIosCreate } from "react-icons/io"

interface Todo {
  _id: string
  userId: string
  task: string
  category: string
  isDone: boolean
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const userId: string | null = localStorage.getItem("userId")

  const getTodos = async () => {
    try {
      const { data } = await axios.get<Todo[]>(`http://localhost:3000/api/todos/${userId}`)
      setTodos(data)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTodo === "") {
      return;
    }
    try {
      await axios.post(`http://localhost:3000/api/todos/${userId}`, {
        userId,
        task: newTodo,
        category: "General",
      })
      getTodos()
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleTodoState = async (id: string, isDone: boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${userId}/${id}`, { isDone: !isDone })
      getTodos()
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${userId}/${id}`)
      getTodos()
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen py-10">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 mx-auto px-4 gap-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">📋 Your Tasks</h1>

        {/* Todo List */}
        <div className="w-full flex flex-col gap-4">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`flex items-center justify-between w-full rounded-xl px-5 py-4 shadow transition duration-300 ${todo.isDone
                ? "bg-gray-300 text-gray-500 line-through"
                : "bg-white text-gray-800"
                }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  className="h-5 w-5 accent-blue-500 cursor-pointer"
                  onChange={() => handleTodoState(todo._id, todo.isDone)}
                />
                <p className="text-lg font-medium break-words">{todo.task}</p>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
                title="Delete task"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-gray-600 text-center w-full">No tasks found.</p>
          )}
        </div>

        <form onSubmit={(e) => handleAddTodo(e)} className="relative w-full mt-6">
          {isAddingTodo && (
            <input
              type="text"
              placeholder="Enter your task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-full px-5 py-3 pr-12 text-gray-800 focus:outline-none shadow"
            />
          )}

          <button
            type={isAddingTodo ? "submit" : "button"}
            onClick={() => !isAddingTodo && setIsAddingTodo(true)}            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
            title="Add Task"
          >
            <IoIosCreate size={24} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
