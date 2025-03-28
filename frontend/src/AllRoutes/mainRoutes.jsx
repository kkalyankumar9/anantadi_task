import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'


import SignUp from '../Components/signUp'
import PrivateRoute from './privateRoute'
import VideosUpload from '../Components/videosUpload'
import GetVideos from '../Components/getVideos'
import Signin from '../Components/signIn'


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/videos' element={<PrivateRoute><GetVideos/></PrivateRoute>}/>
            <Route path='/add_videos' element={<PrivateRoute><VideosUpload/></PrivateRoute>}/>

            
        </Routes>
    </div>
  )
}

export default AllRoutes