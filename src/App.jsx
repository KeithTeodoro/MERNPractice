import Card from "./components/Card";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import IdeasApi from "./CRUD";
import Modal from "./components/Modal";

function App() {
  const [data, setData] = useState([]);
  const [displayCardCount, setDisplayCardCount] = useState(9);
  const modal = useRef();

  const fetchIdeas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ideas/");
      setData(response.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchIdeas();
  }, [displayCardCount]);

  async function addDataToDatabase(idea) {
    try {
      // Add new data at the beginning

      await IdeasApi.createIdea(idea);
      await fetchIdeas();
    } catch (err) {}
  }

  function incrementDisplayCount() {
    setDisplayCardCount((prevCount) => prevCount + 5);
  }

  function openModal() {
    modal.current.open();
  }

  return (
    <>
      <div className="h-full grid place-items-center gap-10 my-5 md:mx-5 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
        <Modal ref={modal} onAdd={addDataToDatabase} />
        <button
          onClick={openModal}
          className="border-solid border-2 border-black  font-montserrat px-5 rounded-full text-[45px] hover:bg-stone-200"
        >
          +
        </button>
        {data.slice(0, displayCardCount).map((ideaRecord) => {
          return (
            <Card
              key={ideaRecord._id}
              username={ideaRecord.username}
              tag={ideaRecord.tag}
              content={ideaRecord.text}
            />
          );
        })}
      </div>
      {data.length > displayCardCount && (
        <button
          onClick={incrementDisplayCount}
          className="border-solid border-2 border-black  font-montserrat px-5 rounded-full text-[45px] hover:bg-stone-200"
        >
          Load More
        </button>
      )}
    </>
  );
}

export default App;
