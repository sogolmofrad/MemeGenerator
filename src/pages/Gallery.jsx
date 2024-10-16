import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Gallery() {
  const [memefigures, setMemeFigures] = useState([]);
  useEffect(function () {
    const memeFiges = JSON.parse(localStorage.getItem("memeFigs"));
    setMemeFigures(memeFiges);
  }, []);
  console.log(memefigures);
  return (
    <div className="p-[10rem] relative">
      <div className="grid grid-cols-3 gap-[3rem] justify-items-center items-center p-[5rem] shadow-2xl rounded-xl">
        {memefigures?.map((figure) => (
          <img
            className="h-[35rem] w-full"
            src={figure.image}
            alt={figure.title}
            key={figure.date}
          />
        ))}
      </div>
      <Link
        to="/"
        className="homeBtn bg-black text-white px-[7rem] py-[1rem] rounded-3xl  text-[1.8rem] absolute bottom-[2rem] left-[43%] hover:bg-white hover:border-2 hover:border-black hover:text-black"
      >
        Home
      </Link>
    </div>
  );
}

export default Gallery;
