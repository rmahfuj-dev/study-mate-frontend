import React, { Suspense } from "react";
import Partners from "./Partners";

const FindPartner = () => {
  const partnersPromise = fetch("http://localhost:3000/partners").then((res) =>
    res.json()
  );
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Partners partnersPromise={partnersPromise} />
    </Suspense>
  );
};

export default FindPartner;
