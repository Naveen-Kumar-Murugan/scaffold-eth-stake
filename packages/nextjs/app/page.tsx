
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
    watch: true,
  })
  const{ data:stakedamount }  = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'stakelog',
    args: [connectedAddress],
  })
  const{ data:contractbalance }  = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'balanceof',
  })
  const{ data:threshold }  = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: 'threshold',
  })

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="w-2/5 flex-col justify-items-center border-4 rounded-3xl shadow-lg border-primary">
          <h1 className="pt-4 text-2xl font-bold">This is Staking Page</h1>
          <Address address={owner as string} />
          <div className="flex justify-between w-full px-16 pt-8">
          <div className=" text-center">
              <p className="font-bold my-0">Time Left:</p>
              <p className="my-1 font-semibold text-primary-content">{Number(timeleft)}</p>
            </div>
            <div className=" text-center">
              <p className="font-bold my-0">Staked Amount:</p>
              <p className="my-1 font-semibold text-primary-content">{Number(stakedamount)/1e18}</p>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold">Total Staked</p>
            <p>{Number(contractbalance)/1e18}/{Number(threshold)/1e18}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
