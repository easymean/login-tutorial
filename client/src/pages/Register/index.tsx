import React, { useState } from "react";
import "./index.scss";
import { register } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const [formError, setFormError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [value, setValue] = useState<{
    username: string;
    password: string;
    confirm: string;
  }>({ username: "", password: "", confirm: "" });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setFormError(false);

    if (e.target.name === "password" || e.target.name === "confirm") {
      const target = e.target.value;
      const password = value.password;
      const confirm = value.confirm;

      if (
        (e.target.name === "confirm" && target === password) ||
        (e.target.name === "password" && target === confirm)
      ) {
        setConfirmError(false);
      } else {
        setConfirmError(true);
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (value.username === "" || value.password === "") {
      setFormError(true);
      return;
    } else if (confirmError) {
      return;
    }
    await register({
      username: value.username,
      password: value.password,
    });
    navigate("/signIn");
  };

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          height: "100%",
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <TextField
          error={formError}
          id="username"
          name="username"
          label="아이디"
          variant="outlined"
          value={value.username}
          onChange={handleChange}
          helperText={formError ? "아이디를 입력하세요" : ""}
        />
        <TextField
          error={formError}
          id="password"
          name="password"
          label="비밀번호"
          value={value.password}
          variant="outlined"
          onChange={handleChange}
          helperText={formError ? "비밀번호를 입력하세요" : ""}
        />
        <TextField
          error={confirmError}
          id="confirm"
          name="confirm"
          label="비밀번호 확인"
          value={value.confirm}
          variant="outlined"
          onChange={handleChange}
          helperText={confirmError ? "비밀번호를 확인하세요" : ""}
        />
        <Button type="submit" variant="outlined">
          회원가입
        </Button>
      </Stack>
    </>
  );
}
