"use client";

import { useMinipay } from "./providers/MinipayProvider";

const Tester = ({ content }: { content?: any }) => {
  const { minipay, currency } = useMinipay();
  return (
    <pre className="max-w-xs text-wrap">
      {JSON.stringify({ ...minipay, currency, ...content }, null, 2)}
    </pre>
  );
};

export default Tester;
