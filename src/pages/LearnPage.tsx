import BottomNav from "../components/BottomNav";
import Learn from "../components/Learn";
import Main from "../components/Main";
import Test from "../components/Test";
import TopNav from "../components/TopNav";

function LearnPage() {
  return (
    <>
      <TopNav />
      <Main>
        <Test />
        <Learn />
      </Main>
      <BottomNav />
    </>
  );
}

export default LearnPage;
