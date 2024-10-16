import Form from "../components/Form";
import Header from "../components/Header";
import Meme from "../components/Meme";
import SideBar from "../components/SideBar";

function Home() {
  return (
    <div className="flex">
      <SideBar />
      <main className="mx-auto py-[5rem]">
        <div className="flex justify-center items-center">
          <Header />
          <Form />
        </div>
        <Meme />
      </main>
    </div>
  );
}

export default Home;
