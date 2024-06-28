"use client";

import { useMinipay } from "./providers/MinipayProvider";

const Tester = () => {
  const { minipay } = useMinipay();
  console.log(minipay);

  return <pre>{JSON.stringify(minipay, null, 2)}</pre>;
};

export default Tester;
