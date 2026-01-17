import { useEffect, useState , useRef} from 'react';
import { Book, MessageSquare, Send, ChevronDown } from 'lucide-react';
import CreateChapter from './CreateChapter';
import axios from 'axios';
import axiosInstance, { PROD_URL } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ToastErrorMessage , ToastSuccessMessage} from '../../utils/toastMessages';
import { LOCAL_URL } from '../../utils/api';

const mockData = {
  novelTitle: "The Last Guardian",
  chaptersCompleted: 12,
  summary: "In a world where magic is fading, Elara discovers she's the last guardian capable of wielding ancient powers. After her mentor's mysterious death, she must navigate treacherous political alliances and confront the shadow creatures threatening to consume the realm. Along her journey, she uncovers secrets about her lineage that could either save or destroy everything she holds dear.",
  chatHistory: [
    { role: 'assistant', content: 'Welcome! I\'m here to help you continue your novel. What would you like to write about next?' },
    { role: 'user', content: 'I want to develop a scene where Elara meets the council of elders' },
    { role: 'assistant', content: 'Excellent choice! Let\'s craft a tense council scene. The elders are skeptical of Elara\'s claims about the shadow creatures. How would you like to portray their reaction?' },
    { role: 'user', content: 'Make them dismissive at first, but then something happens' },
    { role: 'assistant', content: 'Perfect dramatic tension! Here\'s a scene starter:\n\nThe council chamber\'s marble pillars cast long shadows as Elara stood before the seven elders. Elder Thorne leaned forward, his weathered face twisted in skepticism.\n\n"Shadow creatures? Child, those are myths told to frighten children," he scoffed.\n\nBut as his words echoed through the chamber, the torches flickered and died, plunging them into darkness. A cold wind swept through the sealed room, and Elara felt it—the unmistakable presence of shadow magic.' },
  ]
};

function CreateChapter2() {
    const [input, setInput] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const {novel_id,novel_name} = useParams();
    const [novelData,setNovelData] = useState(null);
    const [editedNovelData,setEditedNovelData] = useState(''); // Content after AI edits
    const [isLoading,setIsLoading] = useState(false);
    const isNewResponseChunk = useRef(false); // To keep track of new response chunk
    const navigate = useNavigate();



    // API called to get the chapter user is working on 
    useEffect(()=>{
        axiosInstance.get(`api/novel/${novel_id}/chapter-user-working-on/`)
        .then((response)=>{
            
            if (response.status == 200){
                setNovelData(response.data);
            }


        })
    },[])

    const handleSubmit = ()=>{
        if (isLoading) return; // Prevent submissions while AI is generating response        
        setIsLoading(true);
        const toastId = toast.loading("Generating chapter content...",);
        const eventSource = new EventSource(`${PROD_URL}/AI/create-chapter/${novel_id}?user_query=${input}`)
        eventSource.onmessage = (event)=>{
                


                if(event.data == 'ERROR: Limit reached'){
                    ToastErrorMessage("You have reached your daily Limit");
                    toast.dismiss(toastId);
                    setIsLoading(false);
                    eventSource.close()
                    return
                }
                
                if (event.data == '__DONE__'){
                    setIsLoading(false);
                    toast.dismiss(toastId);
                    isNewResponseChunk.current = true; // Mark that next chunk is new
                    eventSource.close()
                    return
                }

                if (isNewResponseChunk.current){
                    setEditedNovelData(''); // Reset content for new response
                    isNewResponseChunk.current = false;
                }
                setEditedNovelData((prev)=> prev + event.data);
 
            }

        eventSource.onerror = () => {
                toast.dismiss(toastId);    
                setIsLoading(false);
                eventSource.close();
        };      
        setInput('');
 
    }

    const handlePublishChapter = ()=>{
        if(!novelData.chapter_content && !editedNovelData){
            ToastErrorMessage("Please generate chapter content before publishing.");
            return 
        }
        axiosInstance.post(`api/novel/${novel_id}/create-chapter/`)
        .then((response)=>{
            ToastSuccessMessage("Chapter published successfully!");
            navigate(`/novel/${novel_id}/`);
        })
        .catch((err)=>{
            console.log(err)
            ToastErrorMessage("Error publishing chapter. Please try after some time.");
        })
    }

    if (!novelData) {
        return (
          <div className="flex items-center justify-center h-screen bg-gradient-to-br text-white from-gray-900 to-black">
            
            Loading...
          </div>
        );
      }
    
    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-black text-slate-100 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 bg-slate-950 backdrop-blur-sm border-b border-slate-700/50 px-4 py-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Novel info  */}
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-2 rounded-lg shadow-lg">
                    <Book className="w-6 h-6 text-white" />
                    </div>
                    <div>
                    <h1 className="text-xl font-bold text-white">{novelData.novel}</h1>
                    <p className="text-sm text-slate-400">Chapter {novelData.working_chapter } in progress</p>
                    </div>
                </div>

                {/* Buttons */} 
                <div className='flex gap-2'>
                     {/* For mobile screens - Toggle Summary */}
                    <button
                        onClick={() => setShowSummary(!showSummary)}
                        className="lg:hidden bg-slate-700/50 hover:bg-slate-700 p-2 rounded-lg transition-colors"
                    >
                        <ChevronDown className={`w-5 h-5 transition-transform ${showSummary ? 'rotate-180' : ''}`} />
                    </button>
                    {/* Publish Button */}
                    <button 
                        onClick={handlePublishChapter}
                        className='px-4 py-2 bg-white text-black cursor-pointer rounded-xl font-bold'
                    >
                        Publish
                    </button>
                </div>
            </div>
        </header>

        <div className="flex-2 flex overflow-hidden">
            {/* Sidebar - Novel Info */}
            <aside className={`${showSummary ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-80 bg-black border-r border-slate-700/50 flex-shrink-0 absolute lg:relative inset-0 lg:inset-auto z-10 lg:z-0`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Chapters Progress */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-5 border border-slate-600/30 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-semibold text-white">Progress</h2>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                    <span className="text-slate-300">Chapters Completed</span>
                    <span className="text-2xl font-bold text-gray-200">{mockData.chaptersCompleted}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(mockData.chaptersCompleted / 20) * 100}%` }}
                    />
                    </div>
                    <p className="text-xs text-slate-400">Target: 20 chapters</p>
                </div>
                </div>

                {/* Story Summary */}
                <div className="bg-gradient-to-br from-slate-700/40 to-slate-800/40 rounded-xl p-5 border border-slate-600/30 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                    <Book className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-semibold text-white">Story So Far</h2>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                    {novelData.novel_summary || "No summary available."}
                </p>
                </div>

                {/* Quick Stats */}
                {/* <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
                    <p className="text-xs text-slate-400 mb-1">Word Count</p>
                    <p className="text-xl font-bold text-white">47,823</p>
                </div>
                <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
                    <p className="text-xs text-slate-400 mb-1">Characters</p>
                    <p className="text-xl font-bold text-white">8</p>
                </div>
                </div> */}
            </div>

            {/* Close button for mobile */}
            <button
                onClick={() => setShowSummary(false)}
                className="lg:hidden m-4 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors font-medium"
            >
                Close
            </button>
            </aside>

            {/* Chat Area */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
            {/* Messages Container - Fixed height with internal scroll */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                <div className="max-w-4xl mx-auto space-y-4">
              
                    <div className={`flex  justify-center`}>
                        <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 shadow-lg bg-gray-950 text-slate-100 border border-slate-600/30`}>
                            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            'Welcome! I'm here to help you continue your novel. What would you like to write about next?'
                            </p>
                        </div>
                    </div>
                    {/* Chapter Content */}
                    <div className={`flex  justify-center`}>
                        <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 shadow-lg bg-black text-slate-100 border border-slate-600/30`}>
                            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {editedNovelData ? editedNovelData : novelData.chapter_content }
                            </p>
                        </div>
                    </div>
              
                </div>
            </div>

            {/* Input Area - Stays at bottom, doesn't cause page jump */}
            <div className="flex-shrink-0  bg-black backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 bg-slate-700/50 rounded-2xl border border-slate-600/50 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-slate-500/20 transition-all">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (!input.trim() || isLoading) return; // Prevent empty submissions or while loading
                            handleSubmit();
                            setInput('')
                        }
                        }}
                        placeholder="Continue your story... (Press Enter to send, Shift+Enter for new line)"
                        className="w-full bg-transparent px-5 py-3 text-slate-100 placeholder-slate-400 resize-none focus:outline-none text-sm md:text-base max-h-32 min-h-[3rem]"
                        rows={1}
                    />
                    </div>
                    <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white p-3 md:p-4 rounded-2xl transition-all shadow-lg hover:shadow-xl disabled:shadow-none flex-shrink-0"
                    >
                    <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                    AI-powered novel writing assistant
                </p>
                </div>
            </div>
            </main>
        </div>
        </div>
  );
}

export default CreateChapter2;
