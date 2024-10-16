import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import domtoimage from "dom-to-image";

const initialState = {
  topSentence: "",
  bottomSentence: "",
  memes: [],
  memeNumber: 0,
  textColor: "text-white",
  base64Image: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setTopSentence":
      return { ...state, topSentence: action.payload };
    case "setBottomSentence":
      return { ...state, bottomSentence: action.payload };
    case "setMemes":
      return { ...state, memes: action.payload };
    case "setMemeNumber":
      return {
        ...state,
        memeNumber: Math.floor(Math.random() * state.memes.length),
      };
    case "nextMeme":
      if (state.memeNumber == 0) return state;
      return { ...state, memeNumber: state.memeNumber + 1 };
    case "prevMeme":
      if (state.memeNumber == state.memes.length - 1) return state;
      return { ...state, memeNumber: state.memeNumber - 1 };
    case "randomMeme":
      return {
        ...state,
        memeNumber: Math.floor(Math.random() * state.memes.length),
      };
    case "blackColor":
      return { ...state, textColor: "text-black" };
    case "whiteColor":
      return { ...state, textColor: "text-white" };
    case "redColor":
      return { ...state, textColor: "text-red" };
    case "setBase64":
      return { ...state, base64Image: action.payload };

    default:
      return state;
  }
}
const MemeContext = createContext();
function MemeProvider({ children }) {
  const [
    { topSentence, bottomSentence, memes, memeNumber, textColor, base64Image },
    dispatch,
  ] = useReducer(reducer, initialState);

  const figureEl = useRef(null);
  const memeFigures = JSON.parse(localStorage.getItem("memeFigs")) || [];

  useEffect(function () {
    async function fetchMemes() {
      try {
        const res = await fetch(`https://api.imgflip.com/get_memes`);
        const data = await res.json();

        dispatch({ type: "setMemes", payload: data.data.memes });
        dispatch({
          type: "setMemeNumber",
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchMemes();
  }, []);
  function handleDownload() {
    domtoimage
      .toPng(figureEl.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "meme.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((e) => console.log(e));
  }

  function handleSave() {
    const figElement = figureEl.current;

    if (!figElement) {
      console.error("Figure element is not available for capture.");
      return;
    }
    domtoimage
      .toPng(figElement)
      .then((dataUrl) => {
        const newImage = {
          title: topSentence + " " + bottomSentence,
          image: dataUrl,
          date: new Date(),
        };

        const newMemeFigs = [newImage, ...memeFigures];
        localStorage.setItem("memeFigs", JSON.stringify(newMemeFigs));

        dispatch({ type: "setBase64", payload: dataUrl });
      })
      .catch((error) => {
        console.error("Error capturing figure:", error);
      });
  }
  return (
    <MemeContext.Provider
      value={{
        topSentence,
        bottomSentence,
        memes,
        memeNumber,
        handleDownload,
        handleSave,
        textColor,
        base64Image,
        dispatch,
        figureEl,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
}

function useMeme() {
  const context = useContext(MemeContext);
  if (context === "undefined") throw new Error("context is not used properly");
  return context;
}

export { MemeProvider, useMeme };
