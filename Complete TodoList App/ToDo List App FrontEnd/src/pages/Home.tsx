import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    const userId: string | null = localStorage.getItem("userId")
    const { data } = await axios.get(`http://localhost:3000/api/${userId}/todos`)
    setCategories(data)
    console.log(categories);
  }
  useEffect(() => {
    getCategories()
  }, [])
  return (
    <div>

    </div>
  )
}

export default Home
