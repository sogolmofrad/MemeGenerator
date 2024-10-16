import { useMeme } from "../contexts/MemeContext";

function Meme() {
  const {
    memes,
    memeNumber,
    topSentence,
    bottomSentence,
    textColor,
    figureEl,
  } = useMeme();

  return (
    <div className="mt-10">
      <figure className="relative w-[52rem] mx-auto p-[1rem]" ref={figureEl}>
        <figcaption
          className={`absolute w-[50rem] top-[3rem] left-0 text-center topMessage text-[3.2rem] font-bold ${textColor} uppercase`}
        >
          {topSentence}
        </figcaption>
        <img
          src={memes.at(`${memeNumber}`)?.url}
          alt="meme"
          crossOrigin="anonymous"
          className="w-[50rem] mx-auto p-[1rem] border-2 border-dotted border-black"
        />
        <figcaption
          className={`absolute w-[50rem] bottom-[5rem] left-0 text-center topMessage text-[3.2rem]  font-bold ${textColor} uppercase`}
        >
          {bottomSentence}
        </figcaption>
      </figure>
    </div>
  );
}

export default Meme;
