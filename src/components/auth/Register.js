import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";


import { FaGoogle } from "react-icons/fa"; // Import Google icon
import { LOGIN , DASHBOARD } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "hooks/auth";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "utils/form-validate";

export default function Register() {
  const { register: signup, isLoading } = useRegister();
  const { login, isLoading: loginIsLoading } = useLogin(); // Destructure login and isLoading from useLogin
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: LOGIN,
    });
  }

  async function handleGoogleLogin() {
    const loginResponse = await login({ isGoogleLogin: true, redirectTo: DASHBOARD });
    
    // You might need to check the content of loginResponse or how your authentication library handles redirects
    if (loginResponse && loginResponse.redirectTo === DASHBOARD) {
      window.location.href = DASHBOARD; // Redirect the user to the dashboard
    }
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="" p="9" borderWidth="1px" borderRadius="lg">
        <Heading mb="4" size="lg" textAlign="center">
          Sign Up
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="blue"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            Register
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to={LOGIN}
            color="black"
            fontWeight="medium"
            textDecor="underline"
          
          >
            Log In
          </Link>{" "}
          instead!
        </Text>

        <Button
          mt="4"
          type="button"
          bgColor="#ffffff"
          border="1px solid #ccc"
          color="black"
          fontWeight="normal"
          _hover={{ bgColor: "#f5f5f5" }}
          size="md"
          w="full"
          isLoading={isLoading || loginIsLoading} // Combine isLoading states
          loadingText="Signing Up"
          onClick={handleGoogleLogin}
        >
          <FaGoogle style={{ marginRight: "0.5rem", color: "#4285F4" }} /> Sign in with Google
        </Button>

        
      </Box>
    </Center>
  );
}