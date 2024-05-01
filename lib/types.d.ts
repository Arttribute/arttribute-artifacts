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
  whitelist: string[];
  blacklist: string[];
};

type Collection = {
  id: string;
  creator: string; // web3address
  name: string;
  license: LicenseType;
  whitelist: string[];
  blacklist: string[];
};

type CollectionArtifact = {
  id: string;
  artifact_id: string;
  collection_id: string;
};

type Attrbution = {
  id: string;
  artifact_id: string; // 0 if collection
  collection_id: string; // 0 if artifact
  attributor: string; // web3address
  is_valid: boolean;
  expires: Date;
};
