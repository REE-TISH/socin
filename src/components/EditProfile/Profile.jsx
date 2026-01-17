import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  Eye, 
  EyeOff,
  Bell,
  Shield,
  Palette,
  Globe,
  Trash2,
  LogOut,
  Settings,
  Edit3
} from 'lucide-react';
import axios from 'axios';
import axiosInstance from '../../utils/api';
import Loader from '../Loader';
import { ToastErrorMessage, ToastSuccessMessage } from '../../utils/toastMessages';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile,setUserProfile] = useState(null)  
  // Form states
  const [formData,setFormData] = useState({
    name:'',
    bio:'',
  })
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPass,setCurrentPass] = useState('')
  const [newPass,setNewPass] = useState('')


  useEffect(()=>{
    axiosInstance.get('/user/user-profile/')
    .then((response)=>{
        console.log(response.data)
        setUserProfile(response.data)
        let dict = {
                username:response.data.username,
                bio:response.data.bio,
        }
        setFormData(dict)
    })
  },[])

  // Settings states
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newChapters: true,
    comments: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showReadingHistory: true,
    showFavorites: true
  });

  const 
  
  
  
  
  
  
  
  handleInputChange = (field, value) => {

    const passwordFields = ['currentPassword', 'confirmPassword', 'newPassword'];

    if (passwordFields.includes(field)) {

      const sanitizedValue = value.replace(/\s+/g, '');
      
      if (sanitizedValue !== value) {

        ToastErrorMessage("No spaces in Pass");
    }

    value = sanitizedValue;
  }

  
  setFormData(prev => ({
        ...prev,
        [field]: value
    }));
    

  };


  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    const {name,bio} = formData
    const data = {
        name:name,
        bio:bio,
    }
    axiosInstance.put('/user/edit-profile/',data)
    .then((response)=>{
        console.log(response)
        ToastSuccessMessage("Updated Successfuly")
    })

    setIsEditing(false);
    // Show success message
  };

  const handlePasswordChange = () => {
  
    if (newPass.length < 5 && currentPass.length < 5) {
      ToastErrorMessage('Password must be at least 5 characters long!');
      return;
    }

    const data = {
      old_password:currentPass,
      new_password:newPass
    }
    axiosInstance.put('user/change-password/',data)
    .then((response)=>{
      ToastSuccessMessage("Password changed")
      
    })
    .catch((err)=>{
      console.log(err)
      ToastErrorMessage(err.response.data.data)
    })
   
  };

  const handleAvatarChange = () => {
    // Here you would typically open a file picker or avatar selection modal
    alert('Avatar change functionality would be implemented here');
  };

  const handleDeleteAccount = () => {
    axiosInstance.post('user/delete-account/')
    .then((response)=>{
      ToastSuccessMessage('Account Deleted')
      navigate('/login/')
    })
  };


  const handleLogout = ()=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login/')
  }


  const hasSpaces = (str)=>{
    // Test if the string contains any whitespace character
    return /\s/.test(str);
  }

  if(! userProfile){
    return <Loader/>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-2">

      {/* Go Back button */}
      <div>
        <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
        </button>  
      </div>  

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-400" />
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 sticky top-24">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={userProfile.avatar || null}

                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-500/30"
                  />
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 bg-slate-500 hover:bg-slate-600 text-white p-2 rounded-full transition-colors shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{userProfile.username}</h2>
                <p className="text-slate-400">{userProfile.user_id}</p>
                <p className="text-slate-500 text-sm mt-1">Member since </p>
                <p className="text-slate-500 text-xs mt-1">{userProfile.created_at} </p>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Bio</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{userProfile.bio}</p>
              </div>

              {/* Favorite Genres */}
              {/* <div className="mb-6">
                <h3 className="text-white font-semibold mb-2">Favorite Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Reading Stats */}
              {/* <div>
                <h3 className="text-white font-semibold mb-3">Reading Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Comics Read</span>
                    <span className="text-white font-medium">{userProfile.readingStats.comicsRead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Chapters Read</span>
                    <span className="text-white font-medium">{userProfile.readingStats.chaptersRead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Hours Spent</span>
                    <span className="text-white font-medium">{userProfile.readingStats.hoursSpent}h</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Settings Panels */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Profile Information</h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">User_ID</label>
                  <input
                    type="text"
                    value={userProfile.user_id}
                    onChange={(e) => {handleInputChange('user_id', e.target.value)}}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>


                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {isEditing && (
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg border border-slate-700 hover:border-white"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                )}
              </div>
            </div>

            {/* Password Change */}

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">{userProfile.has_password ? <p>Change Password</p> : <p>Set Password</p>}</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">{userProfile.has_password ? <p>Current Password</p> : <p>Set Password</p>}</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPass}
                      onChange={(e) => {
                        if(! hasSpaces(e.nativeEvent.data)){
                          setCurrentPass(e.target.value)
                        }
                        else{
                          ToastErrorMessage('Spaces not allowed')
                        }
                      }}
     
                      className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder={userProfile.has_password ? 'Enter Current Password' : 'Enter Password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                { userProfile.has_password && <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPass}
                      onChange={(e) =>{
                        if(! hasSpaces(e.nativeEvent.data)){
                          setNewPass(e.target.value)
                        }
                        else{
                          ToastErrorMessage('Spaces not allowed')
                        }
                      }}
                      className="w-full px-4 py-3 pr-12 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>}

                <button
                  onClick={handlePasswordChange}
                  disabled={!currentPass || !newPass}
                  className="flex items-center gap-2  text-white px-6 py-3 rounded-lg bg-slate-800 border  cursor-pointer hover:border-white border-slate-600  disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black-500/25"
                >
                  <Lock className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Notification Settings</h2>
              </div>

              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {key === 'emailNotifications' && 'Receive notifications via email'}
                        {key === 'pushNotifications' && 'Receive push notifications in browser'}
                        {key === 'newChapters' && 'Get notified when new chapters are released'}
                        {key === 'comments' && 'Get notified about comments on your activity'}
                        {key === 'marketing' && 'Receive promotional emails and updates'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-purple-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Privacy Settings */}
            {/* <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Privacy Settings</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Profile Visibility</h3>
                  <div className="space-y-2">
                    {['public', 'friends', 'private'].map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option}
                          checked={privacy.profileVisibility === option}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          className="w-4 h-4 text-purple-500 bg-slate-700 border-slate-600 focus:ring-purple-500"
                        />
                        <span className="text-slate-300 capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Show Reading History</h3>
                    <p className="text-slate-400 text-sm">Allow others to see what you're reading</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange('showReadingHistory', !privacy.showReadingHistory)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacy.showReadingHistory ? 'bg-purple-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.showReadingHistory ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Show Favorites</h3>
                    <p className="text-slate-400 text-sm">Display your favorite comics on your profile</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange('showFavorites', !privacy.showFavorites)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      privacy.showFavorites ? 'bg-purple-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.showFavorites ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div> */}

            {/* Danger Zone */}
            <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <div className="flex items-center gap-2 mb-6">
                <Trash2 className="w-5 h-5 text-red-400" />
                <h2 className="text-xl font-bold text-white">Danger Zone</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                  <div>
                    <h3 className="text-white font-medium">Log Out</h3>
                    <p className="text-slate-400 text-sm">Sign out of your account</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                  <div>
                    <h3 className="text-white font-medium">Delete Account</h3>
                    <p className="text-slate-400 text-sm">Permanently delete your account and all data</p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;