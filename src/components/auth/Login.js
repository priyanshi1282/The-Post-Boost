import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { DASHBOARD, REGISTER } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "lib/firebase";

function SuccessPopup({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Password Reset Email Sent</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please check your email for instructions on resetting your password.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState(""); // State for email validation error
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false); // State for success popup

  const handleOpenResetModal = () => {
    setIsResetModalOpen(true);
    // Clear any previous email validation error
    setResetEmailError("");
  };

  const handleCloseResetModal = () => {
    setIsResetModalOpen(false);
    setResetEmail(""); // Clear the email input when the modal is closed
  };

  const handleForgotPassword = async (data) => {
    const { email } = data;

    try {
      await sendPasswordResetEmail(auth, email);
      setIsResetModalOpen(false); // Close the reset password modal
      setIsSuccessPopupOpen(true); // Open the success popup
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      // Handle and display the error to the user
      if (error.code === "auth/invalid-email") {
        setResetEmailError("Please enter a valid email address.");
      } else {
        setResetEmailError("please enter some text in the email field");
      }
    }
  };

  const handleLogin = async (data) => {
    login({
      email: data.email,
      password: data.password,
    });
    console.log(data);
  };

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
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password123"
                {...register("password", passwordValidate)}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  color="black"
                  icon={showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            to={DASHBOARD}
            colorScheme="blue"
            bgColor="black"
            size="md"
            w="full"
            isLoading={isLoading}
            loadingText="Logging In"
          >
            Sign In
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="4">
          <Link
            onClick={handleOpenResetModal}
            color="black"
            fontWeight="medium"
            cursor="pointer"
          >
            Forgot your password?
          </Link>{" "}
          or Don't have an account?{" "}
          <Link
            to={REGISTER}
            as={RouterLink}
            color="black"
            fontWeight="medium"
            textDecor="underline"
          >
            Register
          </Link>{" "}
          instead!
        </Text>

        {/* Password Reset Modal */}
        <Modal isOpen={isResetModalOpen} onClose={handleCloseResetModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reset Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={resetEmailError !== ""}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="user@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <FormErrorMessage>{resetEmailError}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => handleForgotPassword({ email: resetEmail })}
              >
                Reset Password
              </Button>
              <Button variant="ghost" onClick={handleCloseResetModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Success Popup */}
        <SuccessPopup
          isOpen={isSuccessPopupOpen}
          onClose={() => setIsSuccessPopupOpen(false)}
        />
      </Box>
    </Center>
  );
}
