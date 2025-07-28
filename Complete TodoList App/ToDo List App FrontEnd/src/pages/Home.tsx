import axios from "axios"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const Home = () => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const userId: string | null = localStorage.getItem("userId")
      if (!userId) {
        toast.error("User Not Found!")
        return;
      }
      console.log(userId);

      const { data } = await axios.get(`http://localhost:3000/api/todos/${userId}`)
      setCategories(data)
      console.log(categories);
    } catch (error) {
      console.log("Error: ", error);

    }
  }
  useEffect(() => {
    getCategories()
  }, [])
  return (
    <div>
      <ToastContainer />

      <input type="text" placeholder="Add" />
    </div>
  )
}

export default Home
