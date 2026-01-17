import { useEffect, useState } from 'react';
import NovelCard from './NovelCard';
import CreateNovelModal from './CreateNovelModal'
import {ArrowLeft, Pencil} from 'lucide-react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/api';
import Loader from '../Loader';
import { Crown } from 'lucide-react';

function UserProfile() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // const [novels, setNovels] = useState([
  //   {
  //     id: 1,
  //     title: "The Shadow's End",
  //     description: "A dark fantasy tale of redemption and revenge in a world where shadows hold ancient powers.",
  //     coverImage: "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     isPublic: true,
  //     chapters: 24,
  //     views: 15420,
  //     likes: 892,
  //     createdAt: "2024-01-15"
  //   },
  //   {
  //     id: 2,
  //     title: "Echoes of Tomorrow",
  //     description: "A sci-fi thriller exploring the consequences of time travel and the choices that define humanity.",
  //     coverImage: "https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     isPublic: true,
  //     chapters: 18,
  //     views: 8934,
  //     likes: 567,
  //     createdAt: "2024-02-20"
  //   },
  //   {
  //     id: 3,
  //     title: "Whispers in the Dark",
  //     description: "A horror mystery that delves into the supernatural secrets of an abandoned mansion.",
  //     coverImage: "https://images.pexels.com/photos/1936936/pexels-photo-1936936.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     isPublic: false,
  //     chapters: 8,
  //     views: 0,
  //     likes: 0,
  //     createdAt: "2024-03-10"
  //   },
  //   {
  //     id: 4,
  //     title: "Starlight Symphony",
  //     description: "A romantic fantasy set among the stars, where music holds the key to saving the universe.",
  //     coverImage: "https://images.pexels.com/photos/1567069/pexels-photo-1567069.jpeg?auto=compress&cs=tinysrgb&w=400",
  //     isPublic: false,
  //     chapters: 5,
  //     views: 0,
  //     likes: 0,
  //     createdAt: "2024-03-25"
  //   }
  // ]);

  const [novels,setNovels] = useState([])
  const [user,setUser] = useState(null);
  const [is_premium,setIs_premium] = useState(false)
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
  },[])



  
  if(novels == [] || !user) {
    return <Loader/>
  }

  const publicNovels = novels.filter(novel => novel.isPublic);
  const privateNovels = novels.filter(novel => !novel.isPublic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className=" rounded-lg shadow-2xl shadow-black overflow-hidden mb-8 border border-slate-900 ">
         
          <div className="h-48  flex p-1"><Link to={'/'}><ArrowLeft/></Link></div>
           
        {/* User Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-20 mb-6">
              
             <div className='flex flex-col items-center'>
                {is_premium && <Crown size={30} className='text-amber-300 ml-10 rotate-15'/>}
                
               <img
                src={user.avatar || null}
                alt='Avatar'
                className="w-32 h-32 rounded-full border-4 border-zinc-900 object-cover"
              />
              
             </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <h1 className="text-xl lg:text-3xl font-thin text-white">{user.username}</h1>
                <p className="text-gray-400 font-thin text-[10px]">{user.user_id}</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 sm:mt-0  text-gray-500 border border-slate-600 px-3 py-2 rounded-lg font-semibold cursor-pointer hover:text-white hover:border-white transition-colors duration-200 flex items-center gap-2"
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
        />}
      
    </div>
  );
}

export default UserProfile;
