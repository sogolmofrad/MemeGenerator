import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  const [topSentence, setTopSentence] = useState("");
  const [bottomSentence, setBottomSentence] = useState("");
  return (
    <div className="p-[5rem]">
      <Header />
      <Form
        topSentence={topSentence}
        bottomSentence={bottomSentence}
        setBottomSentence={setBottomSentence}
        setTopSentence={setTopSentence}
      />
      <p>{topSentence}</p>
      <p>{bottomSentence}</p>
    </div>
  );
}

export default App;
