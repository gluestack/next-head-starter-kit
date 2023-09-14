import React from 'react';
import {
  Box,
  VStack,
  Button,
  Center,
  ButtonText,
  Link
} from '@gluestack-ui/themed';

import GuestLayout from '../../layouts/GuestLayout';

// Importing the styled version of 'next/image'
import Image from '@/components/StyledImage';

function ActionButtons() {
  return (
    <VStack
      space={'xs'}
      mt={'$10'}
      sx={{
        '@md': {
          mt: '$12',
        },
      }}
    >
      <Button
        sx={{
          ':hover': {
            bg: '$backgroundLight100',
            _text: {
              color: '$primary500',
              textDecorationLine: 'none',
              fontWeight: '$bold',
            },
          },
        }}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        backgroundColor="$backgroundLight0"
      >
        <Link href="/login">
          <ButtonText
            sx={{
              textDecorationLine: 'none',
              fontWeight: '$bold',
            }}
            textDecorationLine="none"
            color="$primary500"
          >
            LOGIN
          </ButtonText>
        </Link>
      </Button>

      <Button
        sx={{
          ':hover': {
            bg: '$white',
            _text: {
              color: '$primary500',
              textDecorationLine: 'none',
              fontWeight: '$bold',
            },
          },
        }}
        my="$4"
        size="md"
        variant="outline"
        borderColor="$borderLight0"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
      >
        <Link href="/signup">
          <ButtonText textDecorationLine="none" color="$textLight50">
            SIGN UP
          </ButtonText>
        </Link>
      </Button>
    </VStack>
  );
}

function HeaderLogo() {
  return (
    <Box alignItems="center" justifyContent="center">
      {/* Image for the bigger screens (Desktop browsers) */}
      <Image
        h="$10"
        w="$80"
        alt="gluestack-ui Pro"
        src={require('./assets/images/gluestackUiProLogo_web_light.svg')}
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        display="none"
      />

      {/* Image for the smaller screens (mobile phone apps and mobile phone browsers) */}
      <Image
        sx={{
          '@md': {
            display: 'none',
          },
        }}
        alt="gluestack-ui Pro"
        display="flex"
        src={require('./assets/images/gluestackUiProLogo_mobile.png')}
        w="$275"
        h="$141"
      />
    </Box>
  );
}

export default function SplashScreen() {
  return (
    <GuestLayout>
      <Center w="$full" flex={1}>
        <Box
          maxWidth="$boxSize"
          w="$full"
          sx={{
            '@md': {
              h: '$544',
              px: '$8',
              bg: '$primary500',
            },
          }}
          px="$4"
          justifyContent="center"
        >
          <HeaderLogo />
          <ActionButtons />
        </Box>
      </Center>
    </GuestLayout>
  );
}