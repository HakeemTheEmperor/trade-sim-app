import BottomNav from "../components/BottomNav";
import Main from "../components/Main";
import SignIn from "../components/SignIn";
import TopNav from "../components/TopNav";

function LoginPage() {
  return (
    <>
      <TopNav />
      <Main>
        <SignIn />
      </Main>
      <BottomNav />
    </>
  );
}

export default LoginPage;
