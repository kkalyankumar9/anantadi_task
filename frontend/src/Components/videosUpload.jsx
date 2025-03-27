import React, { useState } from "react";
import axios from "axios";

const VideosUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("video", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:7000/upload/video_upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Video uploaded successfully!");
      console.log("Upload Response:", res.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        <p>Repurpose video with AI</p>
        <p>Now Repurpose long videos, 10x faster</p>
        <p>
          Sierra allows you to create new video content in just a <br /> few clicks, saving you time and effort.
        </p>
      </div>
      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default VideosUpload;
