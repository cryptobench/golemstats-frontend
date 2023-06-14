import Image from "next/image";
import { Inter } from "next/font/google";
import NetworkStats from "@/components/NetworkStats";
import Historical30mStats from "@/components/30mHistoricalStats";
import { NetworkActivity } from "@/components/charts/NetworkActivity";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <div className="grid gap-y-4">
      <NetworkStats />
      <Historical30mStats />

      <NetworkActivity />
    </div>
  );
}
