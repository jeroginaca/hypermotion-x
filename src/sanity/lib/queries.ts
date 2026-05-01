import { groq } from "next-sanity";

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    author,
    photo,
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    logo,
    logoHeight,
  }
`;
