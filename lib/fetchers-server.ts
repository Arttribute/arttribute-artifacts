export const getArtifactById = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/artifacts/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  return res.json();
};

export const getCollectionById = async (collection_id: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/collections/${collection_id}`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getCollectionItems = async (collection_id: string) => {
  const res = await fetch(
    `${process.env.BASE_URL}/api/collections/${collection_id}/items`,
    {
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data: collectionItems } = await res.json();

  const artifactImages = await Promise.all(
    collectionItems.map(async (item: CollectionItem) => {
      const artifact = await getArtifactById(item.artifactId);

      return artifact.data.imageUrl;
    })
  );

  return artifactImages;
};
