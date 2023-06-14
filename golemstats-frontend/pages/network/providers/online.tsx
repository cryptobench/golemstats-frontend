import { ProviderList } from "@/components/ProviderList";

export default function Home() {
  return <ProviderList endpoint={"v2/network/online/flatmap"} />;
}
