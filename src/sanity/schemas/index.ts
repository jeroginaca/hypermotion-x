import { bannerSchema } from "./banner";
import { featuresSectionSchema } from "./featuresSection";
import { footerSchema } from "./footer";
import { gallerySectionSchema } from "./gallerySection";
import { heroSchema } from "./hero";
import { partnerSchema } from "./partner";
import { partnersSectionSchema } from "./partnersSection";
import { siteSettingsSchema } from "./siteSettings";
import { technologiesSectionSchema } from "./technologiesSection";
import { testimonialSchema } from "./testimonial";

export const schemas = [
  siteSettingsSchema,
  heroSchema,
  featuresSectionSchema,
  partnersSectionSchema,
  partnerSchema,
  bannerSchema,
  testimonialSchema,
  technologiesSectionSchema,
  gallerySectionSchema,
  footerSchema,
];

export const singletonTypes = [
  "siteSettings",
  "hero",
  "featuresSection",
  "partnersSection",
  "banner",
  "technologiesSection",
  "gallerySection",
  "footer",
];
