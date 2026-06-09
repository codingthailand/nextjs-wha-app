import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type ProductCardItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  imageName: string | null;
};

type Props = {
  products: ProductCardItem[];
};

function getProductImage(product: ProductCardItem) {
  return product.imageName
    ? `/product-image/${product.imageName}`
    : "/product-image/nopic.png";
}

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col px-6 py-14 sm:py-20">
      <h2 className="text-pretty text-center font-heading text-headline">
        สินค้าทั้งหมด
      </h2>
      <p className="mt-3 text-pretty text-center text-body-large text-muted-foreground">
        ทุกชิ้นงานทำด้วยมือและความตั้งใจจากช่างฝีมือไทย
      </p>

      {products.length === 0 ? (
        <div className="mt-12 rounded-md border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
          ยังไม่มีสินค้าในฐานข้อมูล
        </div>
      ) : (
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article className="flex rounded-md border border-border bg-card px-6 py-7 hover:border-[#D6D3D1] transition-colors" key={product.id}>
            <div className="flex w-full flex-col">
              <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-md bg-muted sm:mb-6">
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={getProductImage(product)}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <Badge variant="default">#{product.id}</Badge>
                <span className="text-caption text-muted-foreground uppercase tracking-wider">
                  {product.categoryName}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-subhead">
                {product.name}
              </h3>
              <p className="mt-2 line-clamp-2 min-h-12 text-body-small text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-4 text-xl font-semibold text-foreground">
                {priceFormatter.format(product.price)}
              </p>
              <div className="mt-auto">
                <CartButton product={product} />
              </div>
            </div>
          </article>
        ))}
      </div>
      )}
    </section>
  );
};

export default FeaturesProduct;
