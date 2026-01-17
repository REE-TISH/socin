import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, User, BookOpen, Play ,Slack,BookmarkCheck,Bookmark ,Heart,HeartHandshake} from 'lucide-react';

import axiosInstance from '../../utils/api';
import Loader from '../Loader';
import { trackActions } from '../../utils/trackActions';

const NovelDetail = () => {
  const { novel_id } = useParams();
  const navigate = useNavigate();
  const [notFound,setNotFound] = useState(null)
  const [novel,setNovel] = useState(null)  


  useEffect(()=>{
        axiosInstance.get(`/api/novel/${novel_id}/`)
        .then((data)=>{   
            setNovel(data.data)
        })
        .catch((err)=>{
          
          setNotFound(err)
        })
    },[])

  
  useEffect(()=>{
  
    trackActions('view',novel_id)
  },[novel_id])
    
  if (!novel) {
    return (
      <div className='h-screen bg-black  flex items-center justify-center p-4'>
      {/* <Slack className='h-10 w-10 animate-spin text-purple-500' /> */}
      <Loader/>
    </div>
    );
  }

  
  const handleReadComic = () => {
    navigate(`/novel/${novel.id}/chapter/1/${chapter_count}/`);
  };

  const handleLikeOrBookmarks = (action)=>{
    trackActions(action,novel.id)
  }

  const handleBackClick = () => {
    navigate('/');
  };

  // Mock chapters data
  const chapters = Array.from({ length: Math.floor(novel.chapter_count) }, (_, i) => ({
    id: i + 1
  }));

  const chapter_count = chapters.length

  return (
    <div className='lg:min-h-screen bg-gradient-to-br from-gray-900 to-black'>
        <div className="max-w-6xl mx-auto space-y-8 p-10">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="flex items-center space-x-2 text-slate-500 hover:text-purple-300 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Collection</span>
      </button>

      {/* Comic Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cover Image */}
        <div className="lg:col-span-1 p-10">
          <div className="relative h-96 lg:aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-950 ">
            <img
              src={novel.novel_image}
              alt={novel.name}  
              className="w-full h-full object-cover rounded-xl "
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent" />
          </div>
        </div>

        {/* Comic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{novel.name}</h1>
            <div className="flex items-center space-x-4 text-gray-400 mb-4">
              <div  className="flex items-center space-x-1">
                  {/* Author Info */}
                {novel.author_avatar ? 
                <img className='h-10 w-10 object-cover rounded-3xl' src={novel.author_avatar} />
                :<User className="h-4 w-4" />}
                <span>{novel.author}</span>
              </div>
                {/* Dates */}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{novel.publishYear}</span>
              </div>
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{novel.rating}</span>
              </div>
            </div>
            {/* Genre */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="flex gap-2 bg-slate-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                {novel.genres && novel.genres.map((data)=>
                <p className='capitalize' key={data.id}>
                  {data.name} 
                </p>)}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
            <p className="text-gray-300 leading-relaxed">{novel.description}</p>
          </div>
              
              {/* Start Reading Button (Goes to the first chapter of novel) */}
          <div className="flex justify-between space-x-4 items-center">
            <button
              onClick={handleReadComic}
              disabled={chapter_count == 0}
              className={`flex items-center space-x-2 bg-blue-950 ${chapter_count !== 0 && 'hover:bg-slate-900'} text-white px-8 py-4 rounded-xl transition-all duration-200 transform ${chapter_count !==0 && 'hover:scale-105'} shadow-lg shadow-blue-500/25`}
            >
              <Play className="h-5 w-5" />
              <span className="font-semibold">Start Reading</span>
            </button>
            {/* Likes */}
            <div  className=' flex gap-10 items-center'>
                  {novel.is_liked?
                  <HeartHandshake onClick={()=>(handleLikeOrBookmarks('like'))} size={35} className='text-pink-500 cursor-pointer'/>
                  :<Heart onClick={()=>(handleLikeOrBookmarks('like'))} className='text-white cursor-pointer'/>}

            {/* BookMark */}
           
                  {novel.is_bookmarked?
                   <BookmarkCheck onClick={()=>(handleLikeOrBookmarks('bookmark'))} size={30} className='text-green-500 cursor-pointer'/>
                  :<Bookmark onClick={()=>(handleLikeOrBookmarks('bookmark'))} className='text-white cursor-pointer'/>
                  }             
            </div>

          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Chapters</h2>
        <div className="grid gap-3">
          {/* All the chapters  */}
         {chapter_count ?chapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => navigate(`/novel/${novel.id}/chapter/${chapter.id}/${chapter_count}`)}
              className="group bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-purple-500/50 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-white justify-center p-3 bg-slate-600/20 rounded-lg">
                    Chapter : {chapter.id}
                  </div>
                  <div>
                 
                   
                  </div>
                </div>
                
              </div>
            </div>
          ))
        :<>
        <div className='p-5 rounded-xl text-center border border-slate-800'>
          <p className='text-slate-600 text-xl'>No Chapter Yet</p>
        </div>
        </>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default NovelDetail;