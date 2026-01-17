import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Gem , LogOut , BookOpen} from 'lucide-react'

function Header({meta_data}) {
  const [activeTab, setActiveTab] = useState('home');
  

  const LogoutUser = ()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  return (
    <header className="backdrop-filter backdrop-blur-xs border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.108-2.073-.312.286-.465.713-1.227 1.177-2.298.354.684.984 1.134 1.896 1.134 1.135 0 1.933-.82 1.933-2.25 0-1.205-.678-2.025-1.722-2.025-.678 0-1.142.317-1.387.736-.245-.42-.71-.736-1.387-.736-1.044 0-1.722.82-1.722 2.025 0 1.43.798 2.25 1.933 2.25.912 0 1.542-.45 1.896-1.134.464 1.071.891 1.833 1.177 2.298A6.97 6.97 0 0112 19zm0-14c3.86 0 7 3.14 7 7 0 1.552-.507 2.987-1.363 4.149-.362-.764-.913-1.915-1.577-3.359C17.117 11.848 18 10.477 18 8.75 18 6.545 16.455 5 14.25 5c-1.753 0-3.003 1.02-3.003 2.613 0 1.335.798 2.137 1.863 2.137.678 0 1.158-.307 1.423-.742.265.435.745.742 1.423.742 1.065 0 1.863-.802 1.863-2.137C17.819 6.02 16.569 5 14.816 5 12.611 5 11.066 6.545 11.066 8.75c0 1.727.883 3.098 1.94 4.04-.664 1.443-1.215 2.594-1.577 3.359A6.965 6.965 0 015 12c0-3.86 3.14-7 7-7z"/>
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-white">壯鎭</h1>
            </div>

          <div className="flex items-center">
           
            <nav className=" flex items-center ">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-2 py-1 rounded-full font-semibold transition-all ${
                  activeTab === 'home'
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-gray-900'
                }`}
              >
                Home
              </button>
              <Link
              to={'/profile/'}
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'explore'
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-gray-900'
                }`}
              >
                <div className='flex gap-1 justify-center items-center'>
                Create <BookOpen/>  
                </div> 

              </Link>
              {!meta_data.is_premium && <Link
                to={'/subscriptions/'}
                onClick={() => setActiveTab('create')}
                className={`px-2 py-1 cursor-pointer rounded-full font-semibold transition-all text-white gap-1 flex`}
              >
               <Gem/> Get Premium
              </Link>}
              
              <Link
                to={'/edit-profile/'}
                onClick={() => setActiveTab('create')}
                className={`px-2 py-1 cursor-pointer rounded-full font-semibold transition-all text-white gap-1 flex`}
              >
               <img src={meta_data.avatar || null} className='h-8 w-8 rounded-2xl object-cover' />
              </Link>

            </nav>
          </div>


        </div>
      </div>
    </header>
  );
}

export default Header;
