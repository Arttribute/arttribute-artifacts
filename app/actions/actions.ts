"use server";

export async function handleChangeBlackWhiteList(
  id: string,
  directive: "black" | "white",
  list: ListedUser[],
  action: "add" | "remove"
) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/${module}/${id}/${directive}list`,
    {
      method: "PUT",
      body: JSON.stringify({ list, action }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to update list");
  }

  return res.json();
}
