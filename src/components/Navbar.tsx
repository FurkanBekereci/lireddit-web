import React from 'react';
import { Box, Link, Flex, Button, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const handleLogoutClick = async (e) => {
    const {
      data: { logout: logoutRes },
    } = await logout();

    if (logoutRes) {
      console.log('logged out');
    } else {
      console.log('could not be logged out!!');
    }
  };

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;
  // Data loading
  if (fetching) {
    // user is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/auth/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/auth/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } // user is logged in
  else {
    body = (
      <Flex align="center">
        <NextLink href="/add-post">
          <Button as={Link} mr={4}>
            add post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          variant="link"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={1}
      bg={'tan'}
      padding={4}
      align="center"
    >
      <NextLink href="/">
        <Link>
          <Heading>LiReddit</Heading>
        </Link>
      </NextLink>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
