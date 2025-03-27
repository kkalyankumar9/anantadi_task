
import { ToastContainer } from 'react-toastify';
import AllRoutes from './AllRoutes/mainRoutes';
import './App.css';
import VideosUpload from './Components/videosUpload';
import GetVideos from './Components/getVideos';

function App() {
  return (
    <div className="">
             <ToastContainer />
    <AllRoutes/>
    <VideosUpload/>
    
    
    </div>
  );
}

export default App;
