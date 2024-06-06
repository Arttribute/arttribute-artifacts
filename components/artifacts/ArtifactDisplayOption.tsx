"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import BlackWhiteList from "@/components/artifacts/BlackWhiteList";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const ArtifactDisplayOption = ({
  artifact,
  handleChangeList,
}: {
  artifact: Artifact;
  handleChangeList: any;
}) => {
  const { account } = useAuth();
  return account && account == artifact.creatorId ? (
    <BlackWhiteList
      blacklist={artifact.blacklist}
      whitelist={artifact.whitelist}
      module="artifacts"
      id={artifact.id}
      handleChangeList={handleChangeList}
    />
  ) : (
    <Link
      href={`/artifacts/${artifact.id}/attribute`}
      className={buttonVariants()}
    >
      Go to Attribute
    </Link>
  );
};

export default ArtifactDisplayOption;
