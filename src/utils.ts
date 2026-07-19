import {
  GITHUB_ACCOUNT_URL,
  INSTAGRAM_ACCOUNT_URL,
  LINKEDIN_ACCOUNT_URL,
  PORTFOLIO_URL,
  TWITTER_ACCOUNT_URL
} from "@/config.ts";

export const getSocials = () => {
  return {
    portfolio: PORTFOLIO_URL,
    github: GITHUB_ACCOUNT_URL,
    linkedin: LINKEDIN_ACCOUNT_URL,
    twitter: TWITTER_ACCOUNT_URL,
    instagram: INSTAGRAM_ACCOUNT_URL,
  }
}