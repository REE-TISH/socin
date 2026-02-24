import { useEffect, useState } from 'react';
import NovelCard from './NovelCard';
import CreateNovelModal from './CreateNovelModal'
import {ArrowLeft, Leaf,Flower,Pencil} from 'lucide-react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/api';
import Loader from '../Loader';
import { Crown } from 'lucide-react';

function UserProfile() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [novels,setNovels] = useState([])
  const [user,setUser] = useState(null);
  const [is_premium,setIs_premium] = useState(false)
  const [novelCreated,setNovelCreated] = useState(null)
  const handleCreateNovel = (novelData) => {
    const newNovel = {
      id: novels.length + 1,
      ...novelData,
      chapters: 0,
      views: 0,
      likes: 0,
    };
    
    setNovels([newNovel, ...novels]);
    setIsCreateModalOpen(false);
  };

  useEffect(()=>{
    axiosInstance.get('/user/user-profile/')
    .then((response)=>{
      setIs_premium(response.data.is_premium)
      
      setUser(response.data)
    })
    axiosInstance.get("/api/personal-novels/")
    .then((response)=>{

      setNovels(response.data.results)})
  },[novelCreated])



  
  if(novels == [] || !user) {
    return <Loader/>
  }

  const publicNovels = novels.filter(novel => novel.isPublic);
  const privateNovels = novels.filter(novel => !novel.isPublic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" rounded-lg shadow-2xl shadow-black overflow-hidden mb-8 border border-slate-900 ">
         
          <div className="h-24  flex px-4 py-2"><Link to={'/'}><ArrowLeft/></Link></div>
           
        {/* User Profile Info */}
          <div className="px-8 pb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-20 mb-6">
              
              <div className="flex flex-col items-center">
                {/* Added a relative wrapper to contain the absolute positioned crown */}
                <div className="relative mt-5">
                  
                  {/* Crown positioned to perfectly overlap the top right of the frame */}
                  {is_premium && (
                    <>
                      {/* Top-Left Leaf */}
                      <div className="absolute top-2 -left-4 z-20 -rotate-45 drop-shadow-[0_2px_4px_rgba(217,119,6,0.6)] animate-bounce" style={{ animationDuration: '2s' }}>
                        <Leaf size={24} className="text-amber-400 fill-amber-400/30" />
                      </div>

                      {/* Middle-Left Flower */}
                      <div className="absolute top-1/2 -left-6 -translate-y-1/2 z-20 -rotate-12 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-bounce" style={{ animationDuration: '1.5s' }}>
                        <Flower size={20} className="text-yellow-300 fill-yellow-100" />
                      </div>

                      {/* Bottom-Left Leaf (Pointing up towards image) */}
                      <div className="absolute bottom-2 -left-3 z-20 -rotate-[120deg] drop-shadow-md animate-bounce" style={{ animationDuration: '2.5s' }}>
                        <Leaf size={28} className="text-amber-500 fill-amber-500/40" />
                      </div>

                      {/* Bottom-Center "Badge" Flower */}
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] animate-bounce" style={{ animationDuration: '10s' }}>
                        <Flower size={32} className="text-yellow-400 fill-yellow-200" />
                      </div>

                      {/* Bottom-Right Leaf (Pointing up towards image) */}
                      <div className="absolute bottom-1 -right-3 z-20 rotate-[120deg] drop-shadow-md">
                        <Leaf size={24} className="text-amber-500 fill-amber-500/40" />
                      </div>

                      {/* Middle-Right Leaf */}
                      <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-20 rotate-45 drop-shadow-md">
                        <Leaf size={18} className="text-amber-400 fill-amber-400/30" />
                      </div>
                    </>
                  )}

                  {/* The Premium Gradient Ring */}
                  <div
                    className={`relative rounded-full transition-all duration-300 ${
                      is_premium
                        ? " shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                        : "p-0 bg-transparent"
                    }`}
                  >
                    <img
                      src={user.avatar || "/default-avatar.jpg"} 
                      alt="Avatar"
                      className="w-32 h-32 rounded-full  object-cover relative z-0"
                    />
                  </div>
                  
                </div>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <h1 className={`${is_premium ? 'KajiroFont text-yellow-500/70 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'font-thin text-slate-500'} text-2xl lg:text-5xl `}>{user.username}</h1>
                <p className="text-gray-400 font-thin text-[10px]">{user.user_id}</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className={`mt-4 sm:mt-0   border ${is_premium ? 'border-yellow-600 text-yellow-500/80 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] hover:text-yellow-500 hover:border-yellow-600   transition-colors duration-200' : 'border-slate-600 text-gray-500 font-semibold hover:text-white hover:border-white transition-colors duration-200'} px-3 py-2 rounded-lg  cursor-pointer  flex items-center justify-center gap-2`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Novel
              </button>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-3xl">{user.bio}</p>

            <div className="flex gap-8 text-center sm:text-left">
              <div>
                <div className="text-2xl font-bold text-white">{user.novels_created}</div>
                <div className="text-gray-400 text-sm">Novels</div>
              </div>
              {/* <div>
                <div className="text-2xl font-bold text-white">{user.followers.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Followers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{user.following.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div> */}
            </div>

          </div>
        </div>
      {/* Novels Section */}

        {/* Public Novels */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
                <p className='text-white font-thin'>Public Novels</p>
            </h2>
            <span className="text-gray-400">{publicNovels.length} novels</span>
          </div>
          {publicNovels.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {publicNovels.map(novel => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-950/50 border border-slate-900 rounded-lg p-12 text-center">
              <p className="text-gray-400">No public novels yet</p>
            </div>
          )}
        </div>
        
        {/* Private Novels */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
                <p className='font-thin'>Private Novels</p>
            </h2>
            <span className="text-gray-400">{privateNovels.length} novels</span>
          </div>
          {privateNovels.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {privateNovels.map(novel => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-950/50 border border-slate-900 rounded-lg p-12 text-center">
              <p className="text-gray-400">No private novels yet</p>
            </div>
          )}
        </div>
      </div>

       
        {isCreateModalOpen && <CreateNovelModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateNovel}
          novelCreated={setNovelCreated}
        />}
      
    </div>
  );
}

export default UserProfile;
