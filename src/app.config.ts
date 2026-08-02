import {env} from "@/utils/env.ts";

const config = {
  profile: {
    name: 'Isaac Gitonga',
    username: 'isaacgitonga',
    email: 'advisory@isaacgitonga.com',
    url: 'https://isaacgitonga.com',
    github: 'https://github.com/isaacgitonga',
    linkedin: 'https://www.linkedin.com/in/isaacgitonga',
    twitter: 'https://twitter.com/_isaacgitonga',
    instagram: 'https://www.instagram.com/_isaacgitonga',
  },
  availability: {
    contract: 'open',
    consulting: 'open',
  },
  resend: {
    apiKey: env.RESEND_API_KEY,
  }
};

export default config;