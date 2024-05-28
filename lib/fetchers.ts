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
