import { withUrqlClient } from 'next-urql';
import { useDeletePostMutation, useGetPostsQuery } from '../generated/graphql';
import { createUrqlClient } from './../utils/createUrqlClient';
import Layout from './../components/Layout';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useIsAuth } from './../utils/useIsAuth';
import { NextPage } from 'next';
import { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import UpdootSection from './../components/UpdootSection';
import { useMeQuery } from './../generated/graphql';
import EditDeletePostButtons from './../components/EditDeletePostButtons';

const Index: NextPage = () => {
  // useIsAuth();
  // const [{ data: dataMe, fetching }] = useMeQuery();
  // console.log('dataMe : ', dataMe);
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });

  const [{ data, fetching }] = useGetPostsQuery({
    variables,
  });

  // const [{ data: meData }] = useMeQuery();

  //console.log('data coming : ', data);
  // console.log('hasMore: ', data.getPosts.hasMore);

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  // console.log('data:', data?.getPosts.posts);

  return (
    <Layout>
      {/* <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="/add-post">
          <Link ml="auto">add post</Link>
        </NextLink>
      </Flex>
      <br /> */}
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.getPosts.posts.map((p, i) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box ml={8} flex={1}>
                  <NextLink href="post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {p.user.username}</Text>
                  <Flex>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <Box ml="auto">
                      <EditDeletePostButtons userId={p.userId} id={p.id} />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.getPosts.hasMore ? (
        <Flex my={8}>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor:
                  data?.getPosts.posts[data.getPosts?.posts.length - 1]
                    .createdAt,
              })
            }
            isLoading={fetching}
            m="auto"
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
