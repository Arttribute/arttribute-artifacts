import useSWR from "swr";

export const fetchMessage = async (account: string | null) => {
  const res = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ address: account }),
  });

  if (!res.ok) {
    const message = await res.text();
    console.error(message);
    return null;
  }

  const { message } = await res.json();
  return message;
};

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    next: { revalidate: 0 },
  }).then((res) => res.json());

export const useArtifacts = (web3Address: string | null) => {
  const { data, error, isLoading } = useSWR(
    `/api/artifacts?uid=${web3Address}`,
    fetcher
  );

  return {
    artifacts: data as Artifact[],
    isLoading,
    error,
  };
};

export const useCollections = (web3Address: string | null) => {
  const { data, error, isLoading } = useSWR(
    `/api/collections?uid=${web3Address}`,
    fetcher
  );

  return {
    collections: data as Collection[],
    isLoading,
    error,
  };
};
