import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import { ManagementLayout } from "./components/ManagementLayout"
import PersistLogin from "./components/Persist"
import { ProtectedRoute } from "./components/ProtectedRoute"
import RequireAuth from "./components/RequireAuth"
import { Category } from "./screens/Category"
import { CreateNewOperation } from "./screens/CreateOrEditOperation"
import { Income } from "./screens/Income"
import { Operations } from "./screens/Operations"
import { Outcome } from "./screens/Outcome"
import { SignIn } from "./screens/SignIn"
import SignUp from "./screens/SignUp"


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<SignIn />} />
        <Route path='register' element={<SignUp />} />
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth />}>
            <Route element={<ManagementLayout />} >
              <Route path="management">
                <Route index element={<Operations />} />
                <Route path="new" element={<CreateNewOperation />} />
                <Route path="edit/:id" element={<CreateNewOperation />} />
                <Route path="category" element={<Category />} />
                <Route path="income" element={<Income />} />
                <Route path="outcome" element={<Outcome />} />
              </Route>
            </Route>
          </Route>
        </Route>

      </Route>

    </Routes>
  )
}

export default App
