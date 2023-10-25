import { StoreProduct } from "@/server/schema/product";

export default function CartList({ c }: { c: StoreProduct[] }) {
  return (
    <ul>
      {c.map((p, i) => (
        <li>
          {p.name} x {p.quantity}
        </li>
      ))}
    </ul>
  );
}
