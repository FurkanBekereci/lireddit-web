import React from 'react';
import { Formik, Form } from 'formik';

import Wrapper from './../../components/Wrapper';
import InputField from './../../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useRegisterMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './../../utils/createUrqlClient';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();

  const [_, register] = useRegisterMutation();

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const {
            data: { register: result },
          } = await register({ registerData: values });

          // console.log('register result : ', result);

          if (result?.errors) {
            return setErrors(toErrorMap(result?.errors));
          }

          router.push('/');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              id="username"
              name="username"
              label="Username"
              placeholder="Username"
            />
            <Box mt={4} />
            <InputField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
            />
            <Box mt={4} />
            <InputField
              id="password"
              name="password"
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
