import React from 'react';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useRouter } from 'next/router';
import { usePostByIdQuery } from '../../generated/graphql';
import Layout from './../../components/Layout';
import { Box, Heading, Text } from '@chakra-ui/react';

const Post: NextPage = ({}) => {
  const router = useRouter();
  // console.log('router.query.id:', !router.query.id);

  const [{ data, error, fetching }] = usePostByIdQuery({
    pause: !router.query?.id,
    variables: {
      id: Number(router.query.id) || -1,
    },
  });

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
    return <Layout>No post available with id: {router.query.id}</Layout>;
  }

  return (
    <Layout>
      <Heading mb={4}>{data.getPostById.title}</Heading>
      <Text>{data.getPostById.text}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
