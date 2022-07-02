import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { toast, Box, Flex, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import InputField from '../../../components/InputField';
import Layout from '../../../components/Layout';
import { useGetPostFromUrl } from './../../../utils/useGetPostFromUrl';
import { useUpdatePostMutation } from './../../../generated/graphql';
import router from 'next/router';

// interface EditPostProps {

// }

const EditPost: React.FC<{}> = () => {
  const { id, data, error, fetching } = useGetPostFromUrl();

  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.getPostById) {
    <Layout>
      <Box>could not find post</Box>
    </Layout>;
  }

  const { title, text } = data.getPostById;

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: title, text: text }}
        onSubmit={async (values, { setErrors }) => {
          const result = await updatePost({ id, ...values });
          if (!result.error) router.push('/');
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
                edit post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
