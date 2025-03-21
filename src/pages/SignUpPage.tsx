import BottomNav from "../components/BottomNav";
import Main from "../components/Main";
import SignUp from "../components/SignUp";
import TopNav from "../components/TopNav";

function SignUpPage() {
  return (
    <>
      <TopNav />
      <Main>
        <SignUp />
      </Main>
      <BottomNav />
    </>
  );
}

export default SignUpPage;
