const NotFound = ({ resource }: { resource: string }) => {
  return (
    <div className="w-full m-10 flex justify-center items-center flex-col">
      <h1 className="text-6xl font-extrabold mb-7">:\</h1>
      <h2 className="text-lg font-medium">No {resource}s found.</h2>
      <h3 className="font-medium">Create your first {resource}!</h3>
    </div>
  );
};

export default NotFound;
