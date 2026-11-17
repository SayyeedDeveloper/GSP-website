import type { Key, ProductId } from "./i18n";

export const PRODUCTS: Record<
  ProductId,
  { title: Key; desc: Key; why: Key; option: Key; img: string; alt: string; fit: "cover" | "contain" }
> = {
  plain: { title: "p.plain.t", desc: "p.plain.d", why: "picker.why.plain", option: "opt.plain", img: "/assets/oqQop.jpg", alt: "White woven polypropylene bag", fit: "cover" },
  mesh: { title: "p.mesh.t", desc: "p.mesh.d", why: "picker.why.mesh", option: "opt.mesh", img: "/assets/setka.jpg", alt: "Red mesh bag for onions with a green drawstring", fit: "cover" },
  green: { title: "p.green.t", desc: "p.green.d", why: "picker.why.green", option: "opt.green", img: "/assets/bags-green.webp", alt: "Green woven polypropylene bags", fit: "contain" },
  custom: { title: "p.custom.t", desc: "p.custom.d", why: "picker.why.custom", option: "opt.custom", img: "/assets/green.webp", alt: "Bag production line with stacks of finished woven bags", fit: "cover" },
};

export const USES: { key: Key; product: ProductId }[] = [
  { key: "picker.grain", product: "plain" },
  { key: "picker.sugar", product: "plain" },
  { key: "picker.onion", product: "mesh" },
  { key: "picker.build", product: "green" },
  { key: "picker.chem", product: "custom" },
  { key: "picker.other", product: "custom" },
];
