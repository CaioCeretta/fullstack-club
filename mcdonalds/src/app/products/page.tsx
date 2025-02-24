import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductsPage = () => {
  return (
    <div className="rounded-xl border border-red-700 p-5">
      <h1 className="text-red-500">Products Page</h1>
      <Button>FSW 7.0</Button>
      <Input placeholder="Bora fechar esse projeto" />
    </div>
  );
};

export default ProductsPage;
