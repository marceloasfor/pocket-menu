import useSWR from 'swr';

const fetcher = async (url: string, options: any) => {
  const res = await fetch(url, options);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.code = res.status;

    throw error;
  }

  return res.json();
};

export function useFetch<Data = any, Error = any>(
  url: string,
  options: any,
  refreshInterval: number = 0
) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Data, Error>(
    [url, options],
    ([url, options]) => fetcher(url, options),
    {refreshInterval,}
  );
  return { data, error, isLoading, isValidating, mutate };
}
