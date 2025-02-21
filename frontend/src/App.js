import Signup from "./components/Signup/Signup";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App-header">
      <ToastContainer autoClose={3000} />
      <Signup/>
    </div>
  );
};


export default App;
