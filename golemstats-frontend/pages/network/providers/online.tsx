import { ProviderList } from "@/components/ProviderList";

export default function Home() {
  return <ProviderList endpoint={"network/online"} />;
}
