import { use, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/api';
import { X } from 'lucide-react';
import axios from 'axios';
import { ToastErrorMessage, ToastSuccessMessage } from '../../utils/toastMessages';
function CreateNovelModal({ onClose}) {

  const [image,setImage] = useState(null)

  const [formData, setFormData] = useState({
    novelTitle: '',
    novelDescription: '',
    genre:'',
    worldRules:'',
    styleGuide:'',
    coverImage: '',
    isPublic: true,
  });

  // form data
  const data = new FormData();
  
  const [genre,setGenre] = useState([])
  const [tag,setTag] = useState([])
  const genres = ['Fantasy',
                  'Romance',
                  'Sci-Fi',
                  'Mystery',
                  'Horror',
                  'Thriller',
                  'Historical',
                  'Urban Fantasy',
                  'Xianxia',
                  'LitRPG',
                ]

  const tags =  ['historical fiction', 
                 'literary fiction',
                 'young adult',
                  "children's literature",
                  'biography',
                  'autobiography',
                  'memoir',
                  'history',
                  'self-help',
                  'poetry',
                  'drama',
                  'short stories'
                ]

                
  const handleGenreChange = (newGenre)=>{
      if(genre.includes(newGenre)){
        return
      }
      setGenre((prev)=>[...prev,newGenre])
  }

  const handleTagChange = (newTag)=>{
      if(tag.includes(newTag)){
        return
      }
      setTag((prev)=>[...prev,newTag])
  }

  // Remove the Tag 
  const handleRemoveTag = (name)=>{
    let newTag = tag.filter((t)=> t !== name)
    setTag(newTag)
  }

  // Remove the genre 
  const handleRemoveGenre = (name)=>{
    let newGenres = genre.filter((g)=> g !== name)
    setGenre(newGenres)
  }

  // For Image input 
  const handleImageChange = (e) => {
      const file = e.target.files[0]
      setImage(file);
  };


  // Post request to the server to create novel
  const createNovel = async ()=>{
    const { novelTitle, novelDescription, worldRules, styleGuide , isPublic} = formData;

    if (!novelTitle || !novelDescription || !genre || !worldRules || !styleGuide || !tag) {
      ToastErrorMessage("Please fill all required fields");
      return;
    }
    const CloudformData = new FormData();
    CloudformData.append("file", image);
    CloudformData.append("upload_preset", "Socin_images");

    let cloudinaryImage = null
    
    if (image){
       // Upload the image to Cloud
      const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/novelsocinbackend/image/upload",CloudformData);

      cloudinaryImage = cloudinaryResponse.data.secure_url
    }
   
    // Form data for Django

    let djangoData = {
      name:novelTitle,
      created_by:'',
      description:novelDescription,
      genres:genre,
      world_rules:worldRules,
      style_guide:styleGuide,
      current_chapter:0,
      novel_image:cloudinaryImage,
      isPublic:isPublic,
      tags:tag
    }
    axiosInstance.post('api/create-novel/',djangoData)
    .then((response)=>{
      ToastSuccessMessage("Novel Created")
    })
    .catch((error)=>{
      if(error?.response?.data?.error == "novel creation limit"){
        ToastErrorMessage("Can't create more novels!! Buy premium")
      }
      else{
        ToastErrorMessage("Something went wrong")
      }
      
    })
    onClose()
}


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950/40 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-black border border-slate-800">
        <div className="sticky top-0 border-b backdrop-blur-md border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Create New Novel</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Novel Title */}
        <div className='p-4'>
          <div className="mb-6">
            <label htmlFor="title" className="block text-white font-semibold mb-2">
              Novel Title *
            </label>
            <input
              type="text"
              id="title"
              name="novelTitle"
              value={formData.novelTitle}
              onChange={handleChange}
              placeholder="Enter your novel title"
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>

          {/* Description About the Novel That user want to create */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-white font-semibold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="novelDescription"
              value={formData.novelDescription}
              onChange={handleChange}
              placeholder="Write a brief description of your novel"
              rows="4"
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
              required
            />
          </div>

          {/* Genre of the novel */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-white font-semibold mb-2">
              Genre *
            </label>
            {genre.length > 0 && 
            <div className='flex flex-wrap gap-2 p-1'>
             {genre.map((g,id)=>{
                return <p className='px-2 py-1 bg-slate-900 flex justify-center items-center gap-0.5 rounded-xl text-sm' key={id}>{g} <X onClick={()=>{handleRemoveGenre(g)}} size={15} className='hover:bg-slate-900 p-0.5 rounded-xl cursor-pointer'/></p>
            })}  
            </div>} 
            
            <select id="genre" name="genre" onChange={(e)=>{handleGenreChange(e.target.value)}} required 
            className="w-full bg-slate-900 cursor-pointer text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors">
                {/* Genres Options  */}
                {genres.map((genre,id)=>(
                  <option key={id} value={genre}>{genre}</option>
                ))}       
            </select>
          
          </div>
          {/* Tags For the Novel */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-white font-semibold mb-2">
              Choose Tags *
            </label>
            {tag.length > 0 && 
            <div className='flex flex-wrap gap-2 p-1'>
             {tag.map((t,id)=>{
                return <p className='px-2 py-1 bg-slate-900 flex justify-center items-center gap-0.5 rounded-xl text-sm' key={id}>{t} <X onClick={()=>{handleRemoveTag(t)}} size={15} className='hover:bg-slate-900 p-0.5 rounded-xl cursor-pointer'/></p>
            })}  
            </div>} 
            
            <select id="tag" name="tag" onChange={(e)=>{handleTagChange(e.target.value)}} required 
            className="w-full bg-slate-900 cursor-pointer text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors">
                {/* Tag Options  */}
                {tags.map((tag,id)=>(
                  <option key={id} value={tag}>{tag}</option>
                ))}       
            </select>
          
          </div>

          {/* World Rules , World could be magical or just like ours or might have special powers */}
           <div className="mb-6">
            <label htmlFor="title" className="block text-white font-semibold mb-2">
              World Rules *
            </label>
            <input
              type="text"
              id="worldRules"
              name="worldRules"
              value={formData.worldRules}
              onChange={handleChange}
              placeholder="Explain fundamental rules and boundaries determining the limits of the world"
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>

          {/* STYLE GUIDE ( POV, tense, prose style, tone rules ) */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-white font-semibold mb-2">
              Style guide *
            </label>
            <input
              type="text"
              id="styleGuide"
              name="styleGuide"
              value={formData.styleGuide}
              onChange={handleChange}
              placeholder="POV, tense, prose style, tone rules"
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors"
              required
            />
          </div>

          {/* Set the Cover Image for the Novel */}
          <div className="mb-6">
            <label htmlFor="coverImage" className="block text-white font-semibold mb-2">
              Choose Cover Image 
            </label>
           <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleImageChange} 
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3"
            />
            <p className="text-gray-400 text-sm mt-2">Leave empty for default cover image</p>
          </div>

          
          {/* Whether Novel is Public or Private */}
          <div className="mb-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
                className="w-5 h-5 bg-zinc-800 border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div>
                <span className="text-white font-semibold block">Make this novel public</span>
                <span className="text-gray-400 text-sm">Public novels can be viewed by anyone</span>
              </div>
            </label>
          </div>


          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-800/40 hover:border-red-500 border border-red-900 text-white py-3 rounded-lg transition-colors duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={createNovel}
              className="flex-1  hover:border-white cursor-pointer text-white border border-slate-700 py-3 rounded-lg transition-colors duration-200 font-semibold"
            >
              Create Novel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default CreateNovelModal;
