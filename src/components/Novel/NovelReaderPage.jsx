import React, { useState, useEffect ,useRef} from 'react';
import { useParams, useNavigate, NavLink, replace } from 'react-router-dom';
import { ArrowLeft, Slack} from 'lucide-react';
import axiosInstance from '../../utils/api';
import Loader from '../Loader';
import { trackActions } from '../../utils/trackActions';



const NovelReader = () => {
  const { novel_id, chapter_no,chapter_count } = useParams();
  const navigate = useNavigate();

  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  

  const [novelData,setNovelData] = useState(null)

  if(chapter_count == chapter_no){
    trackActions('finish',novel_id)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, []);  

  useEffect(()=>{
    axiosInstance.get(`/api/novel/${novel_id}/chapter/${chapter_no}/`)
    .then((response)=>{
      
      console.log(response.data)
      setNovelData(response.data)
    })
    .catch((err)=>{
        if(err.status == 404){
          navigate('/Page-Not-Found/')
        }
        
    })
  },[novel_id,chapter_no])

  useEffect(()=>{
    trackActions('read',novel_id)
  },[novel_id])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        navigate(`/comic/${comic_id}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [chapter_no,navigate]);

  const NavigateToNextChapter = ()=>{
    navigate(`/novel/${novel_id}/chapter/${Math.floor(chapter_no) + 1}/${chapter_count}/`,{replace:true});
  }




  if(!novelData){
   return(<div className='h-screen bg-black flex items-center justify-center p-4'>
      {/* <Slack className='h-10 w-10 animate-spin text-purple-500' /> */}
      <Loader/>
    </div>)
  }


  return (
    <div className="min-h-screen bg-black">
      {/* Reader Header */}
      <div className='px-3 pt-2 text-white  flex justify-between items-center'>
        
        <NavLink className='flex' to={`/novel/${novel_id}`}>
          <ArrowLeft/>
          Go back
          </NavLink>

          <div >
            Press 'Esc' to go back
          </div>

      </div>

      {/* Comic Pages Scroll Display */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <p className='text-2xl md:text-3xl text-white text-center md:mb-20 mb-10 font-bold'> {novelData.chapter_name}</p>
        <div>
        
        <p  className=' text-white whitespace-pre-line'>
            {novelData.content}    
        </p>

        </div>
        
        {/* End of Chapter */}
        <div className="text-center py-12">
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">End of Chapter {chapter_no}</h3>
            <p className="text-gray-400 mb-6">You've reached the end of this chapter</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate(`/novel/${novel_id}`)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Back to Details
              </button>
              {chapter_no < chapter_count && (
                <button
                  onClick={NavigateToNextChapter}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Next Chapter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* CommentSection */}
        
          {/* <CommentSection chapterComments={commentMessages} comic_id={novel_id} chapter_no={chapter_no} changeComments={setNewComment} CommentEnd={messagesEndRef}/> */}
        
      </div>
    </div>
  );
};

export default NovelReader;