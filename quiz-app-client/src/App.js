import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  return (
    <div className="App lex h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
