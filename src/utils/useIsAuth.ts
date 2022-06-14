import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  console.log('meresult:', data);

  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      const pathName =
        router.pathname == '/' ? '' : `?returnUrl=${router.pathname}`;
      router.push(`/auth/login${pathName}`);
    }
  }, [fetching, data, router]);
};
