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

} 
from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";



import { DASHBOARD, REGISTER } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    login({
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
    console.log(data);
  }

  async function handleGoogleLogin() {
    login({ isGoogleLogin: true, redirectTo: DASHBOARD });
}

  return (
    <Center w="100%" h="100vh">
      <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
      

        <Heading mb="4" size="lg" textAlign="center">
          Welcome Back!
        </Heading>
        

        <form onSubmit={handleSubmit(handleLogin)}>
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
            loadingText="Logging In"
          >
            Sign In
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to={REGISTER}
            color="black"
            fontWeight="medium"
            textDecor="underline"
          >
            Register
          </Link>{" "}
          instead!
        </Text>
       {/* ... (existing form code) */}
        
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
          isLoading={isLoading}
          loadingText="Logging In"
          onClick={handleGoogleLogin}
        >
          <FaGoogle style={{ marginRight: "0.5rem", color: "red" }} /> Sign in with Google
        </Button>
      </Box>
   
    </Center>
  );
}



