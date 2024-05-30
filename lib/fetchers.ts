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

const fetcher = async (url: string) => {
  const res = await fetch(url, { next: { revalidate: 0 } });

  if (!res.ok) {
    const msg = await res.text();
    const error = new Error(msg);
    console.error(error);
    throw error;
  }

  return res.json();
};

export const useArtifacts = (web3Address: string | null) => {
  const { data, error, isLoading } = useSWR(
    `/api/artifacts?uid=${web3Address}`,
    fetcher
  );

  return {
    artifacts: data as Artifact[] | undefined,
    isLoading,
    error: error as Error | undefined,
  };
};

export const useCollections = (web3Address: string | null) => {
  const { data, error, isLoading } = useSWR(
    `/api/collections?uid=${web3Address}`,
    fetcher
  );

  return {
    collections: data as Collection[] | undefined,
    isLoading,
    error: error as Error | undefined,
  };
};
