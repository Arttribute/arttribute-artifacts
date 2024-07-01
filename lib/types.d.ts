type LicenseType =
  | "open"
  | "exclusive"
  | "non_commercial"
  | "exclusive_non_commercial";

type Artifact = {
  id: string;
  name?: string;
  creatorId: string; // web3address
  imageUrl: string;
  artifactHash: string; // perceptual hash
  license: LicenseType;
  whitelist: ListedUser[];
  blacklist: ListedUser[];
  createdAt: Date;
  updatedAt: Date;
};

type Collection = {
  id: string;
  creatorId: string; // web3address
  name: string;
  license: LicenseType;
  whitelist: ListedUser[];
  blacklist: ListedUser[];
  createdAt: Date;
  updatedAt: Date;
};

type CollectionItem = {
  artifactId: string;
  collectionId: string;
  createdAt: Date;
  updatedAt: Date;
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

type AuthHeaders = {
  address: string | null;
  message: string | null;
  signature: string | null;
};

type TransactionBody = {
  account: `0x${string}`;
  to: `0x${string}`;
  value: bigint;
  data?: `0x${string}`;
};

type Token = "cUSD" | "USDC" | "USDT";
