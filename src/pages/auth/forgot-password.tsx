import React from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import Wrapper from '../../components/Wrapper';
import InputField from '../../components/InputField';
import { Box, Button } from '@chakra-ui/react';
import { useForgotPasswordMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './../../utils/createUrqlClient';

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const router = useRouter();

  const [_, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const {
            data: { forgotPassword: result },
          } = await forgotPassword(values);

          console.log('forgot password result: ', result);

          if (result) router.push('/auth/login');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
            />
            <Box mt={4} />

            <Button
              type="submit"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
