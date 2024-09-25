import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
import dateFormat from 'dateformat';
import DOMPurify from 'dompurify';

const cookies = new Cookies();
const token = cookies.get('loginToken');

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const PageEntry = () => {
  const ids = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({});

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await axios.get(`/api/otu-heart/myEntry?_id=${ids.id}`, config);
        setEntry(res.data.message);

       
        cookies.set('id', res.data.message._id, { path: '/update' });
        cookies.set('image', res.data.message.image, { path: '/update' });
        cookies.set('title', res.data.message.title, { path: '/update' });
        cookies.set('content', res.data.message.content, { path: '/update' });
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    fetchEntry();
  }, [ids.id, config]);

  const dateTime = dateFormat(entry.date, "mmmm dS, yyyy");
  const imageLink = entry.image;

  // Sanitize the content for safe rendering
  const sanitizedContent = DOMPurify.sanitize(entry.content);

  return (
    <>
      <div className="entryDetails">
        <img src={imageLink} alt={entry.title} />
        <h3>{entry.title}</h3>
        <p id="dateTime">{dateTime}</p>
        <br />
        {/* Use dangerouslySetInnerHTML to render sanitized HTML */}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <div id="dashboardButtons">
          <a href="/update"><button type="button">Update</button></a>
          <a href="/dashboard"><button type="button">Dashboard</button></a>
        </div>
      </div>
    </>
  );
};

export default PageEntry;
