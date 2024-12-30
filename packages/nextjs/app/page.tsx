
"use client";

import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Staking: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const{ data:owner }  = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'owner',
  })
  const{ data:timeleft }  = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'timeleft',
  })
  const{ data:stakedamount }  = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'stakelog',
    args: [connectedAddress],
  })
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="w-2/5 flex-col justify-items-center border-4 rounded-3xl shadow-lg border-primary">
          <h1 className="pt-4 text-lg font-bold">This is Staking Page</h1>
          <Address address={owner as string} />
          <div className="flex justify-between w-full px-8">
            <div>
              <p>Time Left:</p>
              <p>{Number(timeleft)}</p>
            </div>
            <div>
              <p>Staked Amount:</p>
              <p>{Number(stakedamount)/1e18}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
