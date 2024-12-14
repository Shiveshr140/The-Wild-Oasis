import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";

////*********************** User Authentication
// Lets check login apoAuth.js function
// This is really just a JWT token. We have a refresh token even. And so that's the stuff about the session. And we have the user itself. So we have when they were created, we have their email and very importantly we have this role here of authenticated,
// which means that indeed the user is now authenticated. And so from now on, on all the next requests Supabase will automatically send this data to the server to basically let Supabase know that we are currently authenticated.

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!email || !password) return;
//     login({ email, password });
//   }

//   return (
//     <Form onSubmit={handleSubmit}>
//       <FormRowVertical label="Email address">
//         <Input
//           type="email"
//           id="email"
//           // This makes this form better for password managers
//           autoComplete="username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormRowVertical>
//       <FormRowVertical label="Password">
//         <Input
//           type="password"
//           id="password"
//           autoComplete="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </FormRowVertical>
//       <FormRowVertical>
//         <Button size="large">Login</Button>
//       </FormRowVertical>
//     </Form>
//   );
// }

// export default LoginForm;

////**** after useLogin

function LoginForm() {
  const [email, setEmail] = useState("shivr140@gmail.com");
  const [password, setPassword] = useState("123456");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
