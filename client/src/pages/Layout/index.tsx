import { Link, Outlet } from "react-router-dom";
import "./index.scss";
import { Button, Box, Container } from "@mui/material";
import { useUserStore } from "@/store/user";

export default function Layout() {
  const { user, clear } = useUserStore();

  const handleClickLogout = async () => {
    clear();
  };
  return (
    <div className="layout">
      <Box
        component="nav"
        height={50}
        display="flex"
        justifyContent={"end"}
        gap={4}
        px={10}
      >
        <Button>
          <Link to={"/posts"}>글 목록</Link>
        </Button>
        {user ? (
          <>
            <Button>
              <Link to={"/profile"}>내정보</Link>
            </Button>
            <Button onClick={handleClickLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            <Button>
              <Link to={"/signIn"}>로그인</Link>
            </Button>
            <Button>
              <Link to={"/register"}>회원가입</Link>
            </Button>
          </>
        )}
      </Box>
      <Container sx={{ height: "100%" }}>
        <Outlet />
      </Container>
    </div>
  );
}
