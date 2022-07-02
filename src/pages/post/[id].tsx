import React from 'react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import Layout from './../../components/Layout';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useGetPostFromUrl } from './../../utils/useGetPostFromUrl';
import EditDeletePostButtons from './../../components/EditDeletePostButtons';

const Post: NextPage = ({}) => {
  const { id, data, error, fetching } = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading</div>
      </Layout>
    );
  }

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!data?.getPostById) {
    return <Layout>Post not found</Layout>;
  }

  const { title, text, id: postId, userId } = data.getPostById;
  return (
    <Layout>
      <Heading mb={4}>{title}</Heading>
      <Text mb={4}>{text}</Text>
      <EditDeletePostButtons id={postId} userId={userId} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
