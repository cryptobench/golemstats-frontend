import { ProviderList } from "@/components/ProviderList";
import { useRouter } from "next/router";
const NodeOperator = () => {
  const router = useRouter();
  const { node_id } = router.query;

  if (node_id) {
    return (
      <ProviderList endpoint={`provider/wallet/${router.query.node_id}`} />
    );
  } else {
    return <div>loading...</div>;
  }
};

export default NodeOperator;
