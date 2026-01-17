import { useState } from 'react';
import Header from './components/HomePage/Header';
import MasonryGrid from './components/HomePage/MasonryGrid';
import SearchBar from './components/HomePage/SearchBar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './components/UserProfile/UserProfile.jsx'
import Home from './components/HomePage/Home.jsx';
import { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import Error404 from './components/Error404.jsx';
import CreateChapter from './components/ChapterCreation/CreateChapter.jsx'
import LoginPage from './account/LoginPage.jsx';
import RegisterPage from './account/RegisterPage.jsx';
import NovelDetail from './components/Novel/NovelDetailPage.jsx';
import NovelReader from './components/Novel/NovelReaderPage.jsx';
import Subscriptions from './components/SubscriptionPlans/Subscriptions.jsx';
import { UploadIcon } from 'lucide-react';
import UploadImage from './components/UserProfile/UploadImages.jsx';
import CreateChapter2 from './components/ChapterCreation/CreateChapter2.jsx';
import ProfilePage from './components/EditProfile/Profile.jsx';

function App() {


  return (

    <BrowserRouter>
        {/* <ToastContainer/> */}
        <Toaster/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/" element={<UserProfile />} />
          <Route path='/edit-profile/' element={<ProfilePage/>} />
                  {/*Create Chapter */}
          <Route path='/create-chapter/:novel_id/:novel_name/' element={<CreateChapter2/>}/> 
            {/*Opens Detailed Novel Page of Each novel */} 
          <Route path='/novel/:novel_id/' element={<NovelDetail/>}/> 
          <Route path='/novel/:novel_id/chapter/:chapter_no/:chapter_count/' element={<NovelReader/>}/>
                {/* Signing Up pages */}
          <Route path='/login/' element={<LoginPage/>}/>
          <Route path='/signup/' element={<RegisterPage/>} />
                {/* Subscriptions Page */}
          <Route path='/subscriptions/' element={<Subscriptions/>}/>
           <Route path='/upload-image/' element={<UploadImage/>} />
                {/* Not Found Page */}
          <Route path='*' element={<Error404/>}/>
                  {/* Upload image testing */}
         
        </Routes>
    </BrowserRouter>
  );
}

export default App;
