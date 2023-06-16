import { ProviderList } from "@/components/ProviderList";
import { useRouter } from "next/router";
const NodeOperator = () => {
  const router = useRouter();
  const { node_id } = router.query;

  if (node_id) {
    return (
      <>
        <h1 className="text-2xl  font-medium dark:text-gray-300">
          Nodes operated by wallet
        </h1>
        <span className="text-gray-500 dark:text-gray-400 mb-6 block">
          {router.query.node_id}
        </span>
        <ProviderList endpoint={`v2/provider/wallet/${router.query.node_id}`} />
      </>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default NodeOperator;
