import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LibraryLogin from './components/LibraryLogin'
import OfficeList from './components/OfficeList'
import LibraryBooks from './components/LibraryBooks'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibraryLogin />} />
        <Route path="/office" element={<OfficeList />} />
        <Route path="/books" element={<LibraryBooks />} />
        <Route path="*" element={<LibraryLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App