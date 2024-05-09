import CreateCollectionForm from "@/components/forms/CreateCollectionForm";

export default async function CreateCollection() {
  return (
    <div className="container p-6 space-y-2 w-full">
      <CreateCollectionForm />
    </div>
  );
}
