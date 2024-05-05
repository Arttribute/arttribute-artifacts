type LicenseType =
  | "open"
  | "exclusive"
  | "non_commercial"
  | "exclusive_non_commercial";

type Artifact = {
  id: string;
  creator: string; // web3address
  image_url: string;
  artifact_hash: string; // perceptual hash
  license: LicenseType;
  whitelist: ListedUser[];
  blacklist: ListedUser[];
};

type Collection = {
  id: string;
  creator: string; // web3address
  name: string;
  license: LicenseType;
  whitelist: ListedUser[];
  blacklist: ListedUser[];
};

type CollectionArtifact = {
  id: string;
  artifact_id: string;
  collection_id: string;
};

type Attribution = {
  id: string;
  artifact_id: string; // 0 if collection
  collection_id: string; // 0 if artifact
  attributor: string; // web3address
  is_valid: boolean;
  expires: Date;
};

type ListedUser = {
  id: string;
  date_added: Date;
};
