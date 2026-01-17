import { useState } from 'react';
import { Send, Sparkles, Trash2 } from 'lucide-react';
import axiosInstance from '../../utils/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LOCAL_URL } from '../../utils/api';

function CreateChapter() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {novel_id,novel_name} = useParams()
  const [genreatedResult,setGeneratedResult] = useState('')
  
  const navigate = useNavigate()
  // const handleSubmit = async () => {
  //   if (!prompt.trim()) return;

  //   setIsLoading(true);
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   setResult(`Result for: "${prompt}"\n\nThis is where your output would appear. The interface is now ready to be connected to your backend processing logic.`);
  //   setIsLoading(false);
  // };


  const handleClear = () => {
    setPrompt('');
    setResult('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

    const [formData, setFormData] = useState({
    chapterName: '',
    chapterContent: '',
    extraData:'',
  });

  

  // const handleSubmit = ()=>{
  //   const {chapterName,chapterContent,extraData} = formData
  //   if(!chapterContent){
  //     toast.warning("Chapter content was not filled" ,{theme:'dark'})
  //     return
  //   }
  //   const data = {
  //     name:chapterName,
  //     user_query:chapterContent,
  //   }
  //   axiosInstance.post(`/api/novel/${novel_id}/create-chapter/`,data)
  //   .then((respones)=>{

  //     toast.success("Chapter created Successfully",{theme:"dark"})
  //     navigate(`/profile/`)
  //   })
  //   .catch((err)=>{
  //     toast.error("Something went wrong",{theme:"dark"})
  //   })
  // }

  const handleSubmit = ()=>{

    const eventSource = new EventSource(`${LOCAL_URL}/AI/create-chapter/${novel_id}?user_query=${prompt}`)

    eventSource.onmessage = (event)=>{
    if (event.data == '__DONE__'){
      eventSource.close()
      return
    }
    setGeneratedResult((prev)=>`${prev}${event.data}`)
  }

  eventSource.onerror = () => {
  eventSource.close();
  };  
}
  


  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
   

      <main className="flex-1 flex flex-col lg:flex-row  max-w-7xl w-full mx-auto p-4 gap-4">

         {/* The Output Section  */}
        <div className="lg:flex-1 flex flex-col h-108  lg:h-screen lg:pb-12">
          <div className=' lg:h-full overflow-y-scroll'>
            <div className="bg-black rounded-xl shadow-md border border-slate-900 flex flex-col h-full overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-900 bg-black">
                <h2 className="text-sm font-semibold text-gray-700">Output</h2>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                {genreatedResult ? (
                  <pre className="text-slate-300 text-base leading-relaxed whitespace-pre-wrap font-sans">
                    {genreatedResult}
                  </pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Your results will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>      
        </div>

         {/* User prompting Section */}
        <div className='flex-1 flex max-w-7xl justify-center w-full'>
          <div className=" bg-gradient-to-br from-slate-950 to-black  rounded-lg flex flex-col justify-between max-w-4xl w-full max-h-[95vh] overflow-y-auto border border-zinc-800">
           {/* Information about the chapter to be created */}
            <div className="p-6 w-full ">
              {/* Chapter Name */}
              <div className="mb-6">
                <label htmlFor="chapterName" className="block text-white font-semibold mb-2">
                  Chapter Name * (Optional)
                </label>
                <input
                  type="text"
                  id="chapterName"
                  name="chapterName"
                  value={formData.chapterName}
                  onChange={handleChange}
                  placeholder="If not entered ,then AI will choose a chapter name "
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              {/* Content about the chapter That user want to create */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-white font-semibold mb-2">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="chapterContent"
                  value={prompt}
                  onChange={(e)=>{setPrompt(e.target.value)}}
                  placeholder="Enter The Content of the chapter (What would you like to happen in this chapter)"
                  rows="4"
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                  required
                />
              </div>
                
              {/*Extra Information*/}
              <div className="mb-6">
                <label htmlFor="extraData" className="block text-white font-semibold mb-2">
                  Extra *
                </label>
                <textarea
                  type="text"
                  id="extraData"
                  name="extraData"
                  value={formData.extraData}
                  onChange={handleChange}
                  rows='4'
                  placeholder="Explain fundamental rules and boundaries determining the limits of the world"
                  className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                  required
                  
                />
              </div>

            </div>
            {/* Submit Button */}
            <div className="flex gap-4 pb-3 mx-3">
              <button
                type="button"
                onClick={()=>{navigate('/profile/')}}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 cursor-pointer bg-white hover:bg-gray-200 text-black py-3 rounded-lg transition-colors duration-200 font-semibold"
              >
                Create Chapter
              </button>
            </div>
          </div>
        </div>

       
      </main>
    </div>
  );

// return (

//       <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800">
//         <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-white">Create New Novel</h2>
//           <button
//             // onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6">
//           <div className="mb-6">
//             <label htmlFor="title" className="block text-white font-semibold mb-2">
//               Novel Title *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter your novel title"
//               className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
//               required
//             />
//           </div>

//           {/* Description About the Novel That user want to create */}
//           <div className="mb-6">
//             <label htmlFor="description" className="block text-white font-semibold mb-2">
//               Description *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Write a brief description of your novel"
//               rows="4"
//               className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
//               required
//             />
//           </div>

//           {/* Genre of the novel */}
//           <div className="mb-6">
//             <label htmlFor="title" className="block text-white font-semibold mb-2">
//               Genre *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Action , Horror , BrainRot etc"
//               className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
//               required
//             />
//           </div>

//            <div className="mb-6">
//             <label htmlFor="title" className="block text-white font-semibold mb-2">
//               Style guide *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Explain fundamental rules and boundaries determining the limits of the world"
//               className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="title" className="block text-white font-semibold mb-2">
//               World Rules *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="POV, tense, prose style, tone rules"
//               className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="coverImage" className="block text-white font-semibold mb-2">
//               Cover Image URL
//             </label>
//             <input
//               type="url"
//               id="coverImage"
//               name="coverImage"
//               value={formData.coverImage}
//               onChange={handleChange}
//               placeholder="https://example.com/cover-image.jpg (optional)"
//               className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
//             />
//             <p className="text-gray-400 text-sm mt-2">Leave empty for default cover image</p>
//           </div>

          

//           <div className="mb-8">
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input
//                 type="checkbox"
//                 name="isPublic"
//                 checked={formData.isPublic}
//                 onChange={handleChange}
//                 className="w-5 h-5 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
//               />
//               <div>
//                 <span className="text-white font-semibold block">Make this novel public</span>
//                 <span className="text-gray-400 text-sm">Public novels can be viewed by anyone</span>
//               </div>
//             </label>
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="button"
//             //   onClick={onClose}
//               className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg transition-colors duration-200 font-semibold"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-white hover:bg-gray-200 text-black py-3 rounded-lg transition-colors duration-200 font-semibold"
//             >
//               Create Novel
//             </button>
//           </div>
//         </form>
//       </div>

// )

}

export default CreateChapter;
