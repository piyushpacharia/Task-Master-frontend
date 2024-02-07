import { useEffect, useState } from "react"
import {Routes,Route, useNavigate} from "react-router-dom"
import TaskContext from "./TaskContext";
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import ForgetPassword from "./components/ForgetPassword"
import ForgetPasswordInput from "./components/ForgetPasswordInput"
import "./App.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
const [masterUser,setMasterUser]=useState(null);
const [masterTask,setMasterTask]=useState([]);
const navigate=useNavigate();
const BASE_URL ="https://task-master-l189.onrender.com/";
const login=(email,password)=>{
     fetch(`${BASE_URL}/auth/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        email,
        password
      }),
     })
     .then((res)=>res.json())
     .then((data)=>{
     
      if(data.success==false){
        toast.error(data.message);
      }else{
        setMasterUser(data);
        localStorage.setItem("userdata",JSON.stringify(data));
        navigate("/home")
        toast.success("Logged in successful")
      }
     })
     .catch((err) => {
      console.log("Error", err.message);
    });
}

//step 2 signup

const signup=(email,password,name)=>{
  fetch(`${BASE_URL}/auth/signup`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body : JSON.stringify({
      email,
      password,
      name
    }),
  })
  .then((res)=>res.json())
  .then((data)=>{
     if(data.success==true){
      toast.success(data.message);
      navigate("/");
     }else{
      toast.error(data.message);
     }
  })
  .catch((err) => console.log("Error ", err.message));
}

const addTask = (title, description) => {
  fetch(`${BASE_URL}/task/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: masterUser.token,
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == false) {
        toast.error("Error While Adding Task" + data.message);
      } else {
       toast.success("Task Added")
        fetchAllTasks();
       
      }
    })
    .catch((err) => console.log("Error ", err.message));
};
const fetchAllTasks=()=>{
  if (!masterUser) return;
  fetch(`${BASE_URL}/task/get`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization: masterUser.token,

    },
   
})
.then((res)=>res.json())
.then((data)=>{
  if(data.success==false){
    toast.error("Error while fetching your Tasks "+data.message);
  }else{
    setMasterTask(data.tasks)
  }
})
.catch((err) => console.log("Error ", err.message));
  };

const deleteTasks=(taskId)=>{
 
fetch(`${BASE_URL}/task/delete/${taskId}`,{
    method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: masterUser.token,
      },
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success == false) {
      toast.error("Error while Deleting Task " + data.message);
    } else {
    toast.success("Task Deleted")
      fetchAllTasks();
    }
  })
  .catch((err) => console.log("Error ", err.message));
}
const markAsComplete = (taskId) => {
  fetch(`${BASE_URL}/task/mark-complete/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: masterUser.token,
    },
    body: JSON.stringify({ completed: true }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == false) {
        toast.error("Error while Deleting Task " + data.message);
      } else {
        // if Task is deleted successfully
        toast.success("Task Completed")
        fetchAllTasks();
      }
    })
    .catch((err) => console.log("Error ", err.message));
};

useEffect(()=>{
  if(localStorage.getItem("userdata")){
    setMasterUser(JSON.parse(localStorage.getItem("userdata")));
    navigate("/home")
  }
},[])

const logout=()=>{
  navigate("/");
  localStorage.removeItem("userdata");
  setMasterUser(null);
}
  return (
    <TaskContext.Provider
      value={{
        login,
        signup,
        masterUser,
        addTask,
        fetchAllTasks,
        masterTask,
        deleteTasks,
        markAsComplete,
        logout,
        BASE_URL,
      }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/forget-password" element={<ForgetPassword />}/>
          <Route 
          path="/forget-password/set-password/:token" element={<ForgetPasswordInput/>}
          />
        </Routes>

    </TaskContext.Provider>
  )
}
