function Form({
  topSentence,
  bottomSentence,
  setTopSentence,
  setBottomSentence,
}) {
  return (
    <form className="w-[70%] flex flex-col gap-[1.5rem] justify-between items-center  mt-[3rem]">
      <input
        type="text"
        value={topSentence}
        placeholder="Write the top sentence"
        onChange={(e) => setTopSentence(e.target.value)}
        className="block input input-bordered w-full max-w-md input-warning text-1.6rem]"
      />
      <input
        type="text"
        value={bottomSentence}
        placeholder="Write the bottom sentence"
        onChange={(e) => setBottomSentence(e.target.value)}
        className="block input input-bordered w-full max-w-md input-warning text-1.6rem]"
      />
    </form>
  );
}

export default Form;
