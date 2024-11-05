import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Resources from './components/Resources/Resources';
import MyAccount from './components/MyAccount/MyAccount';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AppLayout from './components/Layout/AppLayout/AppLayout';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route  index element={<Resources />}/>
          <Route path="/resources" element={<Resources />} />
          <Route path="/myaccount" element={<MyAccount />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
