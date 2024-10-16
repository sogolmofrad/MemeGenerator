import { Link } from "react-router-dom";
import { useMeme } from "../contexts/MemeContext";

function SideBar() {
  const { dispatch, handleDownload, handleSave, figureEl } = useMeme();
  console.log(figureEl);
  return (
    <aside className="h-svh w-[20rem] flex flex-col gap-[5rem] p-[5rem]  border-r-2 border-warning">
      <button
        className="btn btn-warning text-[1.2rem]"
        onClick={() => dispatch({ type: "prevMeme" })}
      >
        Previous
      </button>
      <button
        className="btn btn-warning text-[1.2rem]"
        onClick={() => dispatch({ type: "randomMeme" })}
      >
        Random
      </button>
      <button
        className="btn btn-warning text-[1.2rem]"
        onClick={() => dispatch({ type: "nextMeme" })}
      >
        Next
      </button>
      <button
        className="btn btn-warning text-[1.2rem]"
        onClick={() => dispatch({ type: "blackColor" })}
      >
        Black Text
      </button>
      <button
        className="btn btn-warning text-[1.2rem]"
        onClick={() => dispatch({ type: "whiteColor" })}
      >
        White Text
      </button>
      <button
        className="btn btn-warning text-[1.2rem]"
        onClick={() => dispatch({ type: "redColor" })}
      >
        Red Text
      </button>
      <button
        className="btn text-[1.2rem] btn-error text-white"
        onClick={handleDownload}
      >
        Download
      </button>
      <button
        className="btn text-[1.2rem] btn-error text-white"
        onClick={handleSave}
      >
        Save
      </button>
      <Link to="/gallery" className="btn text-[1.2rem] btn-success">
        Gallery
      </Link>
    </aside>
  );
}

export default SideBar;
