import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  Post,
  PostSnippetFragment,
  useVoteMutation,
} from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loading, setLoading] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();

  const handleVote = async (value) => {
    setLoading(value == 1 ? 'updoot-loading' : 'downdoot-loading');
    await vote({
      postId: post.id,
      value,
    });
    setLoading('not-loading');
  };

  return (
    <Flex
      direction="column"
      justifyItems="center"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton
        onClick={() => handleVote(1)}
        isLoading={loading === 'updoot-loading'}
        aria-label="Updoot"
        icon={<ChevronUpIcon boxSize={6} />}
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
      />
      {post.points}
      <IconButton
        onClick={() => handleVote(-1)}
        isLoading={loading === 'downdoot-loading'}
        aria-label="Downdoot"
        icon={<ChevronDownIcon boxSize={6} />}
        colorScheme={post.voteStatus === -1 ? 'red' : undefined}
      />
    </Flex>
  );
};

export default UpdootSection;
