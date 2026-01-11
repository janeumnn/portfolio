import {
  AUTHOR_EMAIL,
  AUTHOR_NAME,
  SITE_URL,
  SOCIALS_GITHUB,
  SOCIALS_INSTAGRAM,
  SOCIALS_LINKEDIN,
  SOCIALS_MONKEYTYPE,
  SOURCE_URL
} from 'astro:env/server';

export default {
  siteUrl: SITE_URL,
  sourceUrl: SOURCE_URL,
  author: {
    name: AUTHOR_NAME,
    email: AUTHOR_EMAIL
  },
  socials: {
    github: SOCIALS_GITHUB,
    linkedin: SOCIALS_LINKEDIN,
    instagram: SOCIALS_INSTAGRAM,
    monkeytype: SOCIALS_MONKEYTYPE
  }
};
