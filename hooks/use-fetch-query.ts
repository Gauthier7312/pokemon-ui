import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const endpoind = 'https://pokeapi.co/api/v2';

export function useFetchQuery(path: string, params?: any) {
  const localUrl =
    endpoind +
    Object.entries(params || {}).reduce(
      (acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)),
      path
    );
  return useQuery({
    queryKey: [localUrl],
    queryFn: async () => {
      // await wait(1);
      const response = await fetch(localUrl);
      return response.json();
    },
  });
}

export const useInfinityFetchQuery = (path: string) => {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoind + path,
    queryFn: async ({ pageParam }) => {
      // await wait(1);
      const response = await fetch(pageParam, {
        headers: {
          Accept: 'application/json',
        },
      });
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if ('next' in lastPage) {
        return lastPage.next;
      }
      return null;
    },
  });
};

// function wait(seconds: number) {
//   return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
// }
