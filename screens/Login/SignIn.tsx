import React, { useState } from "react";
import {
  Center,
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Link,
  useToast,
  Toast,
  Box,
  CheckIcon,
  Checkbox,
  Icon,
  ToastTitle,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon,
  FormControlHelper,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  ButtonText,
  ButtonIcon,
  Image,
  Divider,
  ArrowLeftIcon,
  Heading,
  LinkText,
  InputSlot,
} from "@gluestack-ui/themed";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Keyboard } from "react-native";
import { AlertTriangle, EyeIcon, EyeOffIcon } from "lucide-react-native";

import { GoogleIcon, FacebookIcon } from "./assets/Icons/Social";

import GuestLayout from "../../layouts/GuestLayout";

import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  rememberme: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const onSubmit = (_data: SignInSchemaType) => {
    toast.show({
      placement: "bottom right",
      render: ({ id }) => {
        return (
          <Toast nativeID={id} variant="accent" action="success">
            <ToastTitle>Signed in successfully</ToastTitle>
          </Toast>
        );
      },
    });

    reset();
    // router.push('/dashboard');
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl
          isInvalid={(!!errors.email || isEmailFocused) && !!errors.email}
          isRequired={true}
        >
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signInSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Email"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="md" />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl my="$6" isInvalid={!!errors.password} isRequired={true}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await signInSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? "text" : "password"}
                />
                <InputSlot onPress={handleState} pr="$3">
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                    color="$textDark400"
                  />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="md" />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>

          <FormControlHelper></FormControlHelper>
        </FormControl>
      </VStack>
      <Link href="/forgot-password" ml="auto">
        <LinkText
          fontSize="$sm"
          sx={{
            "@md": { fontSize: "$xs" },
            color: "$primary500",
            textDecorationLine: "none",
            ":hover": { color: "$primary600" },
            fontWeight: "$bold",
          }}
        >
          Forgot password?
        </LinkText>
      </Link>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            my="$5"
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            alignSelf="flex-start"
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>
              <Text
                pl="$3"
                sx={{ _dark: { color: "$warmGray400" } }}
                fontSize="$sm"
              >
                Remember me and keep me logged in
              </Text>
            </CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        size="lg"
        mt="$5"
        sx={{ "@md": { mt: "$3" } }}
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText fontSize="$sm"> SIGN IN</ButtonText>
      </Button>
    </>
  );
};

function SideContainerWeb() {
  return (
    <Center flex={1} bg="$primary500">
      <Image
        w="$80"
        h="$10"
        alt="gluestack-ui Pro"
        resizeMode="contain"
        source={require("./assets/images/gluestackUiProLogo_web_light.svg")}
      />
    </Center>
  );
}

function MobileHeader() {
  return (
    <VStack px="$3" mt="$4.5" space="md">
      <HStack space="md" alignItems="center">
        <Link>
          <Icon as={ArrowLeftIcon} color="$textLight50" />
        </Link>
        <Text color="$textLight50" fontSize="$lg">
          Sign In
        </Text>
      </HStack>
      <VStack space="xs" ml="$1" my="$4">
        <Heading fontSize="$3xl" color="$textLight50" fontWeight="$bold">
          Welcome back
        </Heading>
        <Text
          fontSize="$md"
          fontWeight="normal"
          color="$primary300"
          sx={{
            _dark: { color: "$textDark400" },
          }}
        >
          Sign in to continue
        </Text>
      </VStack>
    </VStack>
  );
}

const Main = () => {
  return (
    <>
      <Box sx={{ "@md": { display: "none" } }}>
        <MobileHeader />
      </Box>
      <Box
        px="$4"
        sx={{
          "@md": {
            px: "$8",
            borderTopLeftRadius: "$none",
            borderTopRightRadius: "$none",
            borderBottomRightRadius: "$none",
          },
          _dark: { bg: "$backgroundDark800" },
        }}
        py="$8"
        flex={1}
        bg="$backgroundLight0"
        borderTopLeftRadius="$2xl"
        borderTopRightRadius="$2xl"
      >
        <Heading
          fontSize="$2xl"
          color="$textLight800"
          sx={{ "@md": { display: "flex" }, _dark: { color: "$textDark50" } }}
          mb="$8"
          display="none"
        >
          Sign in to continue
        </Heading>
        <SignInForm />
        <HStack my="$4" space="md" alignItems="center" justifyContent="center">
          <Divider
            w="$2/6"
            bg="$backgroundLight200"
            sx={{ _dark: { bg: "$backgroundDark700" } }}
          />
          <Text
            fontWeight="medium"
            color="$textLight400"
            sx={{ _dark: { color: "$textDark300" } }}
          >
            or
          </Text>
          <Divider
            w="$2/6"
            bg="$backgroundLight200"
            sx={{ _dark: { bg: "$backgroundDark700" } }}
          />
        </HStack>
        <HStack
          mt="$6"
          sx={{
            "@md": {
              mt: "$4",
            },
          }}
          mb="$9"
          justifyContent="center"
          alignItems="center"
          space="lg"
        >
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={FacebookIcon} size="md" />
            </Button>
          </Link>
          <Link href="">
            <Button action="secondary" variant="link" onPress={() => {}}>
              <ButtonIcon as={GoogleIcon} size="md" />
            </Button>
          </Link>
        </HStack>
        <HStack
          space="xs"
          alignItems="center"
          justifyContent="center"
          mt="auto"
        >
          <Text
            fontSize="$sm"
            fontWeight="$normal"
            color="$textLight500"
            sx={{ _dark: { color: "$textDark400" } }}
          >
            Don't have an account?
          </Text>
          <Link
            href="/signup"
            sx={{
              _text: {
                textDecorationLine: "none",
                ":hover": { color: "$primary600" },
                fontWeight: "$bold",
              },
            }}
          >
            <LinkText
              fontSize="$sm"
              sx={{
                "@md": {
                  fontSize: "$xs",
                },
              }}
              color="$primary500"
            >
              Sign up
            </LinkText>
          </Link>
        </HStack>
      </Box>
    </>
  );
};

export default function SignIn() {
  return (
    <GuestLayout>
      <Box display="none" sx={{ "@md": { display: "flex" } }} flex={1}>
        <SideContainerWeb />
      </Box>
      <Main />
    </GuestLayout>
  );
}
