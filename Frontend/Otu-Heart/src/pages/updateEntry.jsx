import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cookies = new Cookies();
const token = cookies.get('loginToken');
const id = cookies.get('id');
const title1 = cookies.get('title') || '';
const content1 = cookies.get('content') || '';
const image1 = cookies.get('image');

const config = {
  headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
};

function UpdateEntry() {
  const navigate = useNavigate();
  const [created, setCreated] = useState({
    image: image1,
    title: title1,
    content: content1,
  });

  const [imageFile, setImageFile] = useState(null);

  const { title, content } = created;

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCreated({
      ...created,
      [name]: value,
    });
  };

  const handleContentChange = (value) => {
    setCreated({
      ...created,
      content: value,
    });
  };

  const handleError = (err) => {
    toast.error(err.response?.data?.message || 'An error occurred', {
      position: 'top-right',
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleSuccess = async (msg) => {
    toast.success(msg, {
      position: 'top-right',
    });
    setTimeout(() => {
      navigate(`/entryPage/${id}`);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    axios.put(`/api/otu-heart/updateEntry?_id=${id}`, formData, config, { withCredentials: true })
      .then((res) => handleSuccess(res.data.message))
      .catch(err => {
        console.log(err);
        handleError(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(`/api/otu-heart/deleteEntry?_id=${id}`, config, { withCredentials: true })
      .then((res) => handleSuccess(res.data.message))
      .catch(err => {
        console.log(err);
        handleError(err);
      });
  };

  return (
    <>
      <div className="loginForm">
        <h3>Update Entry</h3>
        <ToastContainer className="toasty" />
        <form method="post" onSubmit={handleSubmit}>
          <label htmlFor="file"><b>Image</b></label><br />
          <input
            id="image"
            type="file"
            accept="image/*"
            style={{ cursor: 'pointer' }}
            onChange={handleFileChange}
            name="image"
          /><br /><br />

          <label id="title"><b>Title</b></label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleOnChange}
            name="title"
          /><br />

          <label id="content"><b><i>Your reflection</i></b></label>
          <ReactQuill
            id="txtarea"
            value={content}
            onChange={handleContentChange}
            name="content"
          />

          <button type="submit" id="Loginbut1">Save</button>
          <button type="button" id="Loginbut2" onClick={handleDelete}>Delete</button>

          <a href="/dashboard"><button type="button" id="dashboardbt">My Dashboard</button></a>
        </form>
        <img src='images/leisure.png' id="leisure" />
        <img src='images/tablet.png' id="tablet" />
      </div>
    </>
  );
}

export default UpdateEntry;
