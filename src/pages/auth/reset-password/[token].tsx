import { NextPage } from 'next';
import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './../../../utils/createUrqlClient';
import router, { useRouter } from 'next/router';
import { Box, Button, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import InputField from '../../../components/InputField';
import Wrapper from '../../../components/Wrapper';
import forgotPassword from '../forgot-password';
import { useResetPasswordMutation } from '../../../generated/graphql';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  // console.log('token value : ', router.query.token);
  const token = router.query?.token as string;
  const toast = useToast({
    position: 'top-right',
    variant: 'subtle',
    duration: 3000,
  });
  const [_, resetPassword] = useResetPasswordMutation();

  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const {
            data: { resetPassword: result },
          } = await resetPassword({ ...values, token });

          //console.log('change password result: ', result);

          // console.log("Passe");
          toast({
            status: result ? 'success' : 'error',
            description: `Result :${result ? 'Success' : 'Failure'}`,
          });
          if (result) router.push('/auth/login');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
            />
            <Box mt={4} />

            <Button
              type="submit"
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Change
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// ResetPassword.getInitialProps = ({ query }) => {
//   return {
//     token: query.token as string,
//   };
// };

export default withUrqlClient(createUrqlClient)(ResetPassword);
