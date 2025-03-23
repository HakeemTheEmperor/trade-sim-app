import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import Main from "../components/Main";

function Layout() {
  return (
    <>
      <TopNav />
      <Main>
        <Outlet />
      </Main>
      <BottomNav />
    </>
  );
}

export default Layout;
