import { useRouter } from 'next/router';
import { usePostByIdQuery } from '../generated/graphql';

export const useGetPostFromUrl = () => {
  const router = useRouter();
  // console.log('router.query.id:', !router.query.id);
  const numberId = Number(router.query.id);
  return {
    id: numberId,
    ...usePostByIdQuery({
      pause: !router.query?.id,
      variables: {
        id: numberId || -1,
      },
    })[0],
  };
};
