import React, { useEffect, useState } from "react";
import axios from "axios";

const GetVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://anantadi-task-backend.onrender.com/videos/get_videos",

           { headers: {
                Authorization: `${token}`,
              }},
        );
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Uploaded Videos</h1>
      
      {videos.length === 0 ? (
        <p className="text-center text-gray-600">Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div 
              key={video._id} 
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800">{video.title}</h2>
              <p className="text-gray-600 mt-1">{video.description}</p>
              <p className="text-sm text-gray-500 mt-2">Uploaded by: <span className="text-indigo-600 font-medium">{video.username}</span></p>
              <p className="text-sm text-gray-500">Tags: <span className="text-gray-700">{video.tags.join(", ")}</span></p>

              <video controls className="w-full mt-3 rounded-md border border-gray-300">
                <source src={`https://anantadi-task-backend.onrender.com/${video.filePath}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetVideos;
