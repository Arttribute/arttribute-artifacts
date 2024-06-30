"use client";

const Tester = ({ content }: { content: any }) => {
  return (
    <pre className="max-w-xs text-wrap">{JSON.stringify(content, null, 2)}</pre>
  );
};

export default Tester;
