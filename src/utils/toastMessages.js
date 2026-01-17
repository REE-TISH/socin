import toast, { Toaster } from 'react-hot-toast';


const ToastErrorMessage = (msg)=>{
    toast.error(msg,{  style: {
    background: "black",
    color: "#e5e7eb",
    borderRadius: "12px",
  },})
}

const ToastSuccessMessage = (msg)=>{
    toast.success(msg,{  style: {
    background: "black",
    color: "#e5e7eb",
    borderRadius: "12px",
  },})
}

const ToastAlertMessage = (msg)=>{
  
}

export {ToastErrorMessage,ToastSuccessMessage};