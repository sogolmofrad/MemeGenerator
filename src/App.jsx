import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Meme from "./components/Meme";
import domtoimage from "dom-to-image";

function App() {
  const [topSentence, setTopSentence] = useState("");
  const [bottomSentence, setBottomSentence] = useState("");
  const [memes, setMemes] = useState([]);
  const [memeNumber, setMemeNumber] = useState(0);
  const [textColorClass, setTextColorClass] = useState("text-white");
  const [base64Image, setBase64Image] = useState("");
  const figureEl = useRef(null);
  const memeFigures = JSON.parse(localStorage.getItem("memeFigs")) || [];

  useEffect(
    function () {
      async function fetchMemes() {
        try {
          const res = await fetch(`https://api.imgflip.com/get_memes`);
          const data = await res.json();
          setMemes(data.data.memes);
          setMemeNumber(Math.floor(Math.random() * memes.length));
        } catch (error) {
          throw new Error(error.message);
        }
      }
      fetchMemes();
    },
    [memes.length]
  );

  function handlePrev() {
    if (memeNumber == 0) return;
    setMemeNumber((cur) => cur - 1);
  }
  function handleNext() {
    if (memeNumber == memes.length - 1) return;
    console.log(memeNumber);
    setMemeNumber((cur) => cur + 1);
  }
  function handleRandom() {
    setMemeNumber(Math.floor(Math.random() * memes.length));
  }
  function handleTextColorBlack() {
    setTextColorClass("text-black");
  }
  function handleTextColorWhite() {
    setTextColorClass("text-white");
  }
  function handleTextColorRed() {
    setTextColorClass("text-red");
  }
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

    // Use dom-to-image to capture the element
    domtoimage
      .toPng(figElement)
      .then((dataUrl) => {
        setBase64Image(dataUrl); // Save the Base64 string to state

        const newImage = {
          title: topSentence + " " + bottomSentence,
          image: dataUrl,
          date: new Date(),
        };
        const newMemeFigs = [newImage, ...memeFigures];
        localStorage.setItem("memeFigs", JSON.stringify(newMemeFigs));
      })
      .catch((error) => {
        console.error("Error capturing figure:", error);
      });
  }

  return (
    <div className="relative">
      <main className="p-[3rem] flex flex-col ">
        <div className="flex w-[50rem] gap-[3rem] items-center mx-auto ">
          <Header />
          <Form
            topSentence={topSentence}
            bottomSentence={bottomSentence}
            setBottomSentence={setBottomSentence}
            setTopSentence={setTopSentence}
          />
        </div>
        <Meme
          memes={memes}
          memeNumber={memeNumber}
          topSentence={topSentence}
          bottomSentence={bottomSentence}
          textColorClass={textColorClass}
          figureEl={figureEl}
        />
      </main>
      <aside className="fixed w-[20rem] flex flex-col gap-[5rem] p-[5rem] top-0 left-0 border-r-2 border-warning h-[100%]">
        <button className="btn btn-warning text-[1.2rem]" onClick={handlePrev}>
          Previous
        </button>
        <button
          className="btn btn-warning text-[1.2rem]"
          onClick={handleRandom}
        >
          Random
        </button>
        <button className="btn btn-warning text-[1.2rem]" onClick={handleNext}>
          Next
        </button>
        <button
          className="btn btn-warning text-[1.2rem]"
          onClick={handleTextColorBlack}
        >
          Black Text
        </button>
        <button
          className="btn btn-warning text-[1.2rem]"
          onClick={handleTextColorWhite}
        >
          White Text
        </button>
        <button
          className="btn btn-warning text-[1.2rem]"
          onClick={handleTextColorRed}
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
      </aside>
    </div>
  );
}

export default App;
