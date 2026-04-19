import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

const categories = [
  {
    name: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Essentials",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Street Collection",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
];

const bestSellers = [
  {
    name: "Structured Cotton Shirt",
    price: "$110",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tailored Drawstring Pant",
    price: "$135",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Wool Blend Overcoat",
    price: "$240",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Minimal Crew Sweater",
    price: "$125",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
  },
];

const productGallery = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=80",
];

const instagramImages = [
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
];

const accordionContent: AccordionItem[] = [
  {
    title: "Description",
    content:
      "An elevated everyday layer designed with a refined silhouette, clean seams, and a premium brushed finish.",
  },
  {
    title: "Fabric & Care",
    content:
      "72% organic cotton, 28% recycled polyester. Machine wash cold. Dry flat. Steam gently when needed.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Complimentary shipping on orders above $150. Easy returns within 30 days on unworn pieces.",
  },
];

export default function App() {
  const [activeSize, setActiveSize] = useState("M");
  const [activeImage, setActiveImage] = useState(productGallery[0]);
  const [openAccordion, setOpenAccordion] = useState("Description");

  return (
    <div className="bg-[#f8f8f6] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <div>
            <p className="font-[var(--font-serif)] text-3xl tracking-[0.18em]">PETER</p>
            <p className="text-[10px] tracking-[0.6em] text-[#e8e3dc]">CLOTHING</p>
          </div>
          <nav className="hidden gap-8 text-sm tracking-[0.18em] text-[#f8f8f6] md:flex">
            <a href="#categories" className="transition hover:text-[#c6a75e]">
              Collections
            </a>
            <a href="#product" className="transition hover:text-[#c6a75e]">
              Product
            </a>
            <a href="#journal" className="transition hover:text-[#c6a75e]">
              Journal
            </a>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-screen items-end overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1800&q=80"
          alt="Peter Clothing campaign"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/40 to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24"
        >
          <p className="mb-5 text-sm tracking-[0.35em] text-[#e8e3dc]">PETER CLOTHING</p>
          <h1 className="max-w-3xl font-[var(--font-serif)] text-5xl leading-[0.95] text-[#f8f8f6] md:text-7xl">
            Redefining Everyday Style.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#f8f8f6]/90 md:text-lg">
            Premium essentials for modern confidence.
          </p>
          <div className="mt-9 flex gap-4">
            <a
              href="#categories"
              className="border border-[#f8f8f6] bg-[#f8f8f6] px-8 py-3 text-sm tracking-[0.2em] text-[#111111] transition hover:bg-transparent hover:text-[#f8f8f6]"
            >
              SHOP NOW
            </a>
            <a
              href="#product"
              className="border border-[#f8f8f6]/70 px-8 py-3 text-sm tracking-[0.2em] text-[#f8f8f6] transition hover:border-[#c6a75e] hover:text-[#c6a75e]"
            >
              VIEW PRODUCT
            </a>
          </div>
        </motion.div>
      </section>

      <main>
        <section id="categories" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <h2 className="font-[var(--font-serif)] text-4xl md:text-5xl">Featured Categories</h2>
          <p className="mt-3 max-w-xl text-[#2b2b2b]/80">
            A focused wardrobe of contemporary staples built around movement, form, and confidence.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.a
                key={category.name}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="group relative block h-96 overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/35" />
                <p className="absolute bottom-5 left-5 text-lg tracking-[0.18em] text-[#f8f8f6]">{category.name}</p>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <h2 className="font-[var(--font-serif)] text-4xl md:text-5xl">Best Sellers</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((product) => (
              <div key={product.name} className="group">
                <div className="relative overflow-hidden bg-[#dadada]/40 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[24rem] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 border border-[#111111] bg-[#111111] px-6 py-2 text-xs tracking-[0.2em] text-[#f8f8f6] opacity-0 transition group-hover:opacity-100 hover:bg-[#2b2b2b]">
                    QUICK ADD
                  </button>
                </div>
                <p className="mt-4 text-sm tracking-[0.08em]">{product.name}</p>
                <p className="mt-1 text-sm text-[#2b2b2b]/70">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#dadada] bg-[#e8e3dc] px-6 py-24 text-center md:px-10">
          <p className="mx-auto max-w-4xl font-[var(--font-serif)] text-3xl leading-tight md:text-5xl">
            At Peter Clothing, we believe simplicity is the ultimate sophistication.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#2b2b2b]">
            Designed for confidence. Crafted for comfort.
          </p>
        </section>

        <section id="product" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <h2 className="font-[var(--font-serif)] text-4xl md:text-5xl">Product Spotlight</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="overflow-hidden bg-[#dadada]/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0.3, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.15 }}
                    transition={{ duration: 0.45 }}
                    src={activeImage}
                    alt="Product view"
                    className="h-[38rem] w-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {productGallery.map((image) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden border transition ${
                      activeImage === image ? "border-[#111111]" : "border-transparent"
                    }`}
                    aria-label="Select product view"
                  >
                    <img src={image} alt="Product thumbnail" className="h-32 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs tracking-[0.3em] text-[#2b2b2b]/70">PETER SIGNATURE</p>
              <h3 className="mt-3 font-[var(--font-serif)] text-4xl">Minimal Wool Jacket</h3>
              <p className="mt-4 text-2xl">$260</p>

              <div className="mt-8">
                <p className="text-sm tracking-[0.2em]">SIZE</p>
                <div className="mt-3 flex gap-3">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`h-10 w-10 rounded-full border text-sm transition ${
                        activeSize === size
                          ? "border-[#111111] bg-[#111111] text-[#f8f8f6]"
                          : "border-[#2b2b2b]/35 hover:border-[#111111]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="mt-8 w-full border border-[#111111] bg-[#111111] px-8 py-4 text-sm tracking-[0.2em] text-[#f8f8f6] transition hover:bg-[#2b2b2b]">
                ADD TO CART
              </button>

              <div className="mt-10 divide-y divide-[#dadada] border-y border-[#dadada]">
                {accordionContent.map((item) => {
                  const isOpen = openAccordion === item.title;
                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => setOpenAccordion(isOpen ? "" : item.title)}
                        className="flex w-full items-center justify-between py-4 text-left text-sm tracking-[0.12em]"
                      >
                        {item.title}
                        <span className="text-xl">{isOpen ? "-" : "+"}</span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden pb-4 pr-4 text-[#2b2b2b]/85"
                          >
                            {item.content}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="journal" className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-24">
          <h2 className="font-[var(--font-serif)] text-4xl md:text-5xl">Instagram</h2>
          <p className="mt-3 text-[#2b2b2b]/80">Confidence looks good on you. #PeterClothing</p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {instagramImages.map((image) => (
              <a key={image} href="#" className="group relative block overflow-hidden">
                <img
                  src={image}
                  alt="Peter Clothing style"
                  className="h-60 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#111111] px-6 py-14 text-[#f8f8f6] md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <p className="font-[var(--font-serif)] text-3xl tracking-[0.18em]">PETER</p>
            <p className="mt-1 text-[10px] tracking-[0.6em] text-[#c6a75e]">CLOTHING</p>
            <p className="mt-6 max-w-xs text-sm text-[#f8f8f6]/75">Thank you for choosing confidence.</p>
          </div>
          <div className="flex gap-12 text-sm tracking-[0.14em]">
            <div className="space-y-3">
              <a href="#" className="block transition hover:text-[#c6a75e]">
                Shop
              </a>
              <a href="#" className="block transition hover:text-[#c6a75e]">
                About
              </a>
              <a href="#" className="block transition hover:text-[#c6a75e]">
                Contact
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block transition hover:text-[#c6a75e]">
                Instagram
              </a>
              <a href="#" className="block transition hover:text-[#c6a75e]">
                Pinterest
              </a>
              <a href="#" className="block transition hover:text-[#c6a75e]">
                X
              </a>
            </div>
          </div>
          <form className="md:justify-self-end">
            <label htmlFor="email" className="text-sm tracking-[0.14em] text-[#f8f8f6]/85">
              Newsletter
            </label>
            <div className="mt-3 flex max-w-md border border-[#f8f8f6]/35">
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-3 text-sm placeholder:text-[#f8f8f6]/50 focus:outline-none"
              />
              <button
                type="submit"
                className="border-l border-[#f8f8f6]/35 px-5 text-xs tracking-[0.18em] transition hover:bg-[#f8f8f6] hover:text-[#111111]"
              >
                JOIN
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
}
