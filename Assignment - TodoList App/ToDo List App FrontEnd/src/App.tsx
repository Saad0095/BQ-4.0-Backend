import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import Home from "./pages/Home"
// inspired from https://www.figma.com/design/0wGIeHL5kk0euTMzwbL6z4/To-do-List-Web-App-Design--Community-?node-id=16-34&p=f&t=KM3xDCHxvTRiKyiE-0
// inspired from https://www.behance.net/gallery/93616629/Daily-UI-042-ToDo-List


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupPage />}/>
      <Route path="/todolist" element={<Home />}/>
    </Routes>
  )
}

export default App
