// Run with: node --env-file=.env.local scripts/seed.mjs
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Helpers ──────────────────────────────────────────────────────────────────

async function uploadImage(url, name) {
  process.stdout.write(`  Uploading ${name}... `);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const ext = contentType.includes("png") ? "png" : contentType.includes("svg") ? "svg+xml" : "jpg";
    const asset = await client.assets.upload("image", buffer, {
      filename: `${name}.${ext}`,
      contentType,
    });
    console.log("✓");
    return ref(asset._id);
  } catch (e) {
    console.log(`✗ (${e.message})`);
    return null;
  }
}

const ref = (id) => ({ _type: "image", asset: { _type: "reference", _ref: id } });
const upsert = (doc) => client.createOrReplace(doc);

// ── Image URLs ────────────────────────────────────────────────────────────────

const IMAGES = {
  heroDesktop:       "https://www.figma.com/api/mcp/asset/4b848ddf-2b7d-40a3-8581-4e22e5c6b53b",
  heroMobile:        "https://www.figma.com/api/mcp/asset/d380ed90-7752-48c2-8d80-ddb6b55027cf",
  feature1:          "https://www.figma.com/api/mcp/asset/d4a4304b-c64f-4341-8a2b-53440b44ae5e",
  feature2:          "https://www.figma.com/api/mcp/asset/aa834d37-acc6-4dc3-8aea-431d368fd65a",
  feature3:          "https://www.figma.com/api/mcp/asset/d11c2af4-cf7c-48a9-a2cc-7d587cc51ab0",
  feature4:          "https://www.figma.com/api/mcp/asset/53660613-b5a4-4d13-8b64-edb1302b3334",
  feature5:          "https://www.figma.com/api/mcp/asset/7edcb730-9d15-4123-b0c9-8a2fb2e3b8c1",
  feature6:          "https://www.figma.com/api/mcp/asset/54fd1901-06b6-4f56-8e2e-6f02a82bc74f",
  partnerBosch:      "https://www.figma.com/api/mcp/asset/747808f2-f41e-4a16-868c-f69ae8b0938e",
  partnerNvidia:     "https://www.figma.com/api/mcp/asset/a62ee9ba-0187-4cc0-b33c-39035c28e7ef",
  partnerBrembo:     "https://www.figma.com/api/mcp/asset/43109884-7a10-4f16-b5d0-c8e920ed1223",
  partnerPirelli:    "https://www.figma.com/api/mcp/asset/0a9aa02d-fb15-41ac-ba4d-632933a379b5",
  banner:            "https://www.figma.com/api/mcp/asset/b50bbbe9-cb72-424e-b497-3d07188e23cf",
  testimonial1:      "https://www.figma.com/api/mcp/asset/485cb531-7f6e-439d-a117-3dc525a329ec",
  testimonial2:      "https://www.figma.com/api/mcp/asset/e3d2c861-6ba8-4285-86b5-6de2c45a0131",
  gallery1:          "https://www.figma.com/api/mcp/asset/210b51a4-403e-47a8-a7e1-3442547505f9",
  gallery2:          "https://www.figma.com/api/mcp/asset/ae2f6e4c-0c8a-4e40-935a-f29fe309208c",
  galleryFullDesk:   "https://www.figma.com/api/mcp/asset/6fa6f8db-d25c-4484-8ee2-cbdc14a24bf8",
  galleryFullMobile: "https://www.figma.com/api/mcp/asset/74dd47ad-6cc7-4fc7-bd2e-afcbf831c3cc",
  topGear:           "https://www.figma.com/api/mcp/asset/363cfb74-95fa-47d0-a72c-9cd8d265f451",
  carDriver:         "https://www.figma.com/api/mcp/asset/fc33ceeb-ae38-4042-af4d-6c21ca28bd7a",
  socialIcons:       "https://www.figma.com/api/mcp/asset/38ef9d4b-0c70-455e-8067-841879b7cf6a",
};

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("\n🌱 Seeding Hypermotion X Sanity dataset...\n");

  // 1. Upload all images
  console.log("📸  Uploading images...");
  const img = {};
  for (const [key, url] of Object.entries(IMAGES)) {
    img[key] = await uploadImage(url, key);
  }

  // 2. Site Settings
  console.log("\n⚙️   Site Settings...");
  await upsert({
    _id: "singleton-siteSettings",
    _type: "siteSettings",
    primaryCta: "Book Your Test Drive",
    secondaryCta: "Explore Hyperion X",
    navLinks: [
      { _key: "nav1", label: "Features",      href: "#features" },
      { _key: "nav2", label: "Partners",      href: "#partners" },
      { _key: "nav3", label: "Testimonials",  href: "#testimonials" },
      { _key: "nav4", label: "Technologies",  href: "#technologies" },
    ],
  });
  console.log("  ✓ Site Settings");

  // 3. Hero
  console.log("\n🚗  Hero...");
  await upsert({
    _id: "singleton-hero",
    _type: "hero",
    title: "Electrifying the Future",
    desktopImage: img.heroDesktop,
    mobileImage:  img.heroMobile,
  });
  console.log("  ✓ Hero");

  // 4. Features Section
  console.log("\n⚡  Features Section...");
  await upsert({
    _id: "singleton-featuresSection",
    _type: "featuresSection",
    sectionTitle: "Redefining Speed",
    features: [
      { _key: "f1", label: "Speed & Performance",    image: img.feature1 },
      { _key: "f2", label: "Advanced Electric Motor", image: img.feature2 },
      { _key: "f3", label: "Range & Charging",        image: img.feature3 },
      { _key: "f4", label: "Futuristic Design",       image: img.feature4 },
      { _key: "f5", label: "Interior Technology",     image: img.feature5 },
      { _key: "f6", label: "Sustainability",          image: img.feature6 },
    ],
  });
  console.log("  ✓ Features Section");

  // 5. Partners Section heading
  console.log("\n🤝  Partners Section...");
  await upsert({
    _id: "singleton-partnersSection",
    _type: "partnersSection",
    heading: "Created in partnership with industry leaders",
  });
  console.log("  ✓ Partners Section");

  // 6. Partner documents
  console.log("\n🏢  Partners...");
  const partners = [
    { id: "partner-bosch",   name: "Bosch",   img: img.partnerBosch,   height: 45.161 },
    { id: "partner-nvidia",  name: "Nvidia",  img: img.partnerNvidia,  height: 38 },
    { id: "partner-brembo",  name: "Brembo",  img: img.partnerBrembo,  height: 46.302 },
    { id: "partner-pirelli", name: "Pirelli", img: img.partnerPirelli, height: 42.52 },
  ];
  for (const [i, p] of partners.entries()) {
    await upsert({ _id: p.id, _type: "partner", name: p.name, logo: p.img, logoHeight: p.height, order: i + 1 });
    console.log(`  ✓ ${p.name}`);
  }

  // 7. Banner
  console.log("\n🖼️   Banner...");
  await upsert({ _id: "singleton-banner", _type: "banner", image: img.banner });
  console.log("  ✓ Banner");

  // 8. Testimonials
  console.log("\n💬  Testimonials...");
  await upsert({
    _id: "testimonial-luca",
    _type: "testimonial",
    quote: "A driving experience that redefines the impossible.",
    author: "Luca Ferrari, Professional Driver",
    photo: img.testimonial1,
    order: 1,
  });
  await upsert({
    _id: "testimonial-sofia",
    _type: "testimonial",
    quote: "The future of luxury mobility, today.",
    author: "Sofia Marconi, CEO Hyperion Motors.",
    photo: img.testimonial2,
    order: 2,
  });
  console.log("  ✓ Testimonials");

  // 9. Technologies
  console.log("\n🔬  Technologies Section...");
  await upsert({
    _id: "singleton-technologiesSection",
    _type: "technologiesSection",
    cards: [
      { _key: "t1", label: "Next-gen battery" },
      { _key: "t2", label: "Predictive AI driving system" },
      { _key: "t3", label: "Adaptive lighting system" },
      { _key: "t4", label: "Smart home and app connectivity" },
    ],
  });
  console.log("  ✓ Technologies Section");

  // 10. Gallery
  console.log("\n📷  Gallery Section...");
  await upsert({
    _id: "singleton-gallerySection",
    _type: "gallerySection",
    row1Quote: "Hyperion X has been hailed as the most thrilling electric supercar of the year.",
    row1Logo:  img.topGear,
    row1Image: img.gallery1,
    row2Quote: "A groundbreaking fusion of speed, luxury, and electric innovation.",
    row2Logo:  img.carDriver,
    row2Image: img.gallery2,
    fullWidthImage:       img.galleryFullDesk,
    fullWidthMobileImage: img.galleryFullMobile,
  });
  console.log("  ✓ Gallery Section");

  // 11. Footer
  console.log("\n📌  Footer...");
  await upsert({
    _id: "singleton-footer",
    _type: "footer",
    brandName: "Hyperion X",
    newsletterSubtitle: "Be the first to know about our latest updates and limited editions.",
    newsletterCta: "Join newsletter",
    navLinks: [
      { _key: "l1", label: "Contact",             href: "#" },
      { _key: "l2", label: "Privacy Policy",       href: "#" },
      { _key: "l3", label: "Terms and Conditions", href: "#" },
    ],
    copyright: "2025 – Jerónimo Ginaca",
    socialIcons: img.socialIcons,
  });
  console.log("  ✓ Footer");

  console.log("\n✅  Seed complete!\n");
}

seed().catch((e) => { console.error(e); process.exit(1); });
