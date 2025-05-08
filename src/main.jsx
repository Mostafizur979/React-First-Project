import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Form from './pages/Form.jsx'
import StudentList from './pages/List.jsx'
import Update from './pages/Update.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('rootq')).render(
  <StrictMode>
      <BrowserRouter>
      <Routes>
        <Route index element={<Form />} />
        <Route path="studentlist" element={<StudentList />} />
        <Route path="updateinfo" element={<Update />} />
      </Routes>
      </BrowserRouter>
  </StrictMode>,
)
