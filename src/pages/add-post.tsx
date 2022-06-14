import { Flex, Button, Box, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import InputField from '../components/InputField';
import { useAddPostMutation, useMeQuery } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './../utils/createUrqlClient';
import Layout from '../components/Layout';
import { useIsAuth } from './../utils/useIsAuth';

// interface AddPostProps {

// }

const AddPost: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  const [, addPost] = useAddPostMutation();

  const toast = useToast({
    duration: 2500,
    title: 'Error',
    status: 'error',
  });

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { data, error } = await addPost({ postData: values });
          if (data?.addPost) router.push('/');
          if (error?.message?.includes('not authenticated')) {
            //console.log('Ha buraya geldim');
            toast({ description: 'Unauthenticated user. Please login first!' });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              id="title"
              name="title"
              label="Title"
              placeholder="Title"
            />
            <Box mt={4} />
            <InputField
              id="text"
              name="text"
              label="Body"
              placeholder="text..."
              textarea
            />
            <Flex mt={4}>
              <Button
                mx="auto"
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                add post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(AddPost);
