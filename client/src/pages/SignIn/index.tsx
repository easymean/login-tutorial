import React, { useState } from "react";
import {
  getProfileBySession,
  getProfileByToken,
  loginBySession,
  loginByToken,
} from "@/api/auth";

import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const { set } = useUserStore();
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setError(false);
  };

  const isValid = () => {
    if (value.username === "" || value.password === "") {
      setError(true);
      return;
    }
  };

  const handleClickSession = async () => {
    isValid();
    await loginBySession(value);
    const user = await getProfileBySession();
    set(user);
    navigate("/profile");
  };

  const handleClickToken = async () => {
    isValid();
    await loginByToken(value);
    const user = await getProfileByToken();
    set(user);
    navigate("/profile");
  };

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          height: "100%",
        }}
        component="form"
        autoComplete="off"
      >
        <Typography variant="h4" gutterBottom>
          로그인
        </Typography>
        <TextField
          error={error}
          id="username"
          name="username"
          label="아이디"
          variant="outlined"
          value={value.username}
          onChange={handleChange}
          helperText={error ? "아이디를 입력하세요" : ""}
        />
        <TextField
          error={error}
          id="password"
          name="password"
          label="비밀번호"
          value={value.password}
          variant="outlined"
          onChange={handleChange}
          helperText={error ? "비밀번호를 입력하세요" : ""}
        />
        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={handleClickSession}>
            세션 로그인
          </Button>
          <Button variant="outlined" onClick={handleClickToken}>
            토큰 로그인
          </Button>
        </Box>
      </Stack>
    </>
  );
}
