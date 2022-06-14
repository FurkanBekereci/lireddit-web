import React, { useState } from 'react';
import { Formik, Form } from 'formik';

import Wrapper from './../../components/Wrapper';
import InputField from './../../components/InputField';
import { Box, Button, ButtonGroup, Flex, Link } from '@chakra-ui/react';
import { LoginType, useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './../../utils/createUrqlClient';

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [loginType, setLoginType] = useState(LoginType.Username);

  const [_, login] = useLoginMutation();

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const {
            data: { login: result },
          } = await login({ loginData: values, loginType: loginType });

          // console.log('login result : ', result);

          if (result?.errors) {
            return setErrors(toErrorMap(result?.errors));
          }

          router.push((router.query?.returnUrl as string) || '/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex w="100%" justifyContent="center">
              <span></span>
              <ButtonGroup size="sm" isAttached colorScheme={'teal'}>
                <Button
                  variant={
                    loginType == LoginType.Username ? 'solid' : 'outline'
                  }
                  _focus={{ outline: 'none' }}
                  onClick={() => setLoginType(LoginType.Username)}
                >
                  Username
                </Button>
                <Button
                  variant={loginType == LoginType.Email ? 'solid' : 'outline'}
                  _focus={{ outline: 'none' }}
                  onClick={() => setLoginType(LoginType.Email)}
                >
                  Email
                </Button>
              </ButtonGroup>
            </Flex>
            {loginType == LoginType.Username && (
              <>
                <InputField
                  id="username"
                  name="username"
                  label="Username"
                  placeholder="Username"
                />
                <Box mt={4} />
              </>
            )}
            {loginType == LoginType.Email && (
              <>
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                />
                <Box mt={4} />
              </>
            )}

            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
            />
            <Flex mt={2}>
              <Link ml="auto" href="/auth/forgot-password">
                forgot password
              </Link>
            </Flex>
            <Flex mt={4}>
              <Button
                mx="auto"
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
