import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../helpers/firebaseConfig";
import React from "react";

interface RegisterFormValues {
  email: string;
  password: string;
  password2: string;
}
const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();

  const registerUser = (data: RegisterFormValues) => {
    if (data.password === data.password2) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          console.log("successfully created a user");
        })
        .catch((err) => console.error(err.message));
    } else {
      console.log("Password differ from each other");
    }

    console.log(data);
  };

  const inputStyles = { display: "block", mx: "auto", my: ".5rem" };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(registerUser)}
    >
      <Typography align="center" variant="h2" sx={{ fontSize: "1.5rem" }}>
        Register new account
      </Typography>
      <TextField
        type="email"
        placeholder="email"
        sx={inputStyles}
        {...register("email", { required: true })}
      />
      <TextField
        type="password"
        placeholder="password"
        sx={inputStyles}
        {...register("password", { required: true })}
      />
      <TextField
        type="password"
        placeholder="repeat password"
        sx={inputStyles}
        {...register("password2", { required: true })}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ display: "block", mx: "auto" }}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
