import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import dateFormat from 'dateformat';

const cookies = new Cookies();
const token = cookies.get('loginToken');
const name = cookies.get('name');

const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const UserEntries = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  const fetchEntries = async (page) => {
    try {
      const response = await axios.get(`/api/otu-heart/myEntries?page=${page}&limit=5`, config);
      setEntries(response.data.message);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEntries(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const val = entries.map((item) => {
    const dateTime = dateFormat(`${item.date}`, "mmmm dS, yyyy");
    const imageLink = item.image;

    return (
      <div className="entry" key={item._id}>
        <img src={imageLink} alt={item.title} />
        <h3>{item.title}</h3>
        <p id="dateTime">{dateTime}</p><br />
        <Link to={`/entryPage/${item._id}`}>Read my thoughts</Link>
      </div>
    );
  });

  return (
    <>
      <div className='stuff'>
        {val}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      {val.length === 0 && (
        <div className='none'>
          <p>You have no entries listed. Please create a new entry.</p>
        </div>
      )}
    </>
  );
};

function Dashboard() {
  return (
    <>
      <p id="name"><b>&#128516; Hello {name},</b></p>
      <UserEntries />
      <div id="dashboardButtons">
        <a href="/create"><button type="button" id="dashbutton">Create</button></a>
        <a href="/affirmations2"><button type="button" id="dashbutton">Affirmations</button></a>
      </div>
    </>
  );
}

export default Dashboard;
