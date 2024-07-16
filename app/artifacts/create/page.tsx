import CreateArtifactForm from "@/components/forms/CreateArtifactForm";
import Licenses from "@/components/branding/licenses";

export default async function CreateArtifact() {
  return (
    <div className="flex container p-6 space-y-2 w-full">
      <CreateArtifactForm />
      <div className="hidden lg:block m-8">
        <Licenses />
      </div>
    </div>
  );
}
