import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "singleton-siteSettings"][0] {
    primaryCta, secondaryCta, navLinks
  }
`;

export const heroQuery = groq`
  *[_type == "hero" && _id == "singleton-hero"][0] {
    title, desktopImage, mobileImage
  }
`;

export const featuresSectionQuery = groq`
  *[_type == "featuresSection" && _id == "singleton-featuresSection"][0] {
    sectionTitle,
    features[] { _key, label, image }
  }
`;

export const partnersSectionQuery = groq`
  *[_type == "partnersSection" && _id == "singleton-partnersSection"][0] {
    heading
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    _id, name, logo, logoHeight
  }
`;

export const bannerQuery = groq`
  *[_type == "banner" && _id == "singleton-banner"][0] { image }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, author, photo
  }
`;

export const technologiesSectionQuery = groq`
  *[_type == "technologiesSection" && _id == "singleton-technologiesSection"][0] {
    cards[] { _key, label }
  }
`;

export const gallerySectionQuery = groq`
  *[_type == "gallerySection" && _id == "singleton-gallerySection"][0] {
    row1Quote, row1Logo, row1Image,
    row2Quote, row2Logo, row2Image,
    fullWidthImage, fullWidthMobileImage
  }
`;

export const footerQuery = groq`
  *[_type == "footer" && _id == "singleton-footer"][0] {
    brandName, newsletterSubtitle, newsletterCta,
    navLinks, copyright, socialIcons
  }
`;
