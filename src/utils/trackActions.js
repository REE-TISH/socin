;import axiosInstance from "./api";

export const trackActions = async (action,novel_id)=>{
    try {
        await axiosInstance.post('action/track-actions/',{action:action,novel_id:novel_id})
    
    } catch(err){
        console.error("Tracking failed")
    }
    
}