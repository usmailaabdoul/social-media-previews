
import * as z from "zod";

const baseSchema = z.object({
  profilePicture: z.string().optional(),
  postImages: z.array(z.string()).optional(),
  likeCount: z.number().default(0).optional(),
  commentCount: z.number().default(0).optional(),
  timestamp: z.string().default(new Date().toISOString()).optional(),
  verified: z.boolean().default(true).optional(),
});

export const instagramSchema = baseSchema.extend({
  username: z.string().min(1, "Username is required"),
  fullName: z.string().min(1, "Full name is required"),
  caption: z.string().optional(),
  location: z.string().optional(),
});

export const twitterSchema = baseSchema.extend({
  displayName: z.string().min(1, "Display name is required"),
  handle: z
    .string()
    .min(1, "Handle is required")
    .refine((val) => val.startsWith("@"), {
      message: "Handle must start with @",
    }),
  tweetText: z.string().min(1, "Tweet text is required"),
  retweetCount: z.number().default(0).optional(),
  viewCount: z.number().default(0).optional(),
});

export const facebookSchema = baseSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  postText: z.string().optional(),
  viewCount: z.number().default(0).optional(),
  shareCount: z.number().default(0).optional(),
  // privacyLevel: z.enum(["Public", "Friends", "Friends except...", "Only me"]).default("Public"),
});

export const blueskySchema = baseSchema.extend({
  displayName: z.string().min(1, "Display name is required"),
  handle: z.string().min(1, "Handle is required"),
  postText: z.string().min(1, "Post text is required"),
  repostCount: z.number().default(0).optional(),
  replyCount: z.number().default(0).optional(),
  shareCount: z.number().default(0).optional(),
});

export const linkedinFormSchema = baseSchema.extend({
  fullName: z.string().min(1, "Name is required"),
  headline: z.string().optional(),
  postText: z.string().min(1, "Post text is required"),
  repostCount: z.number().default(0).optional(),
});

export type InstagramFormValues = z.infer<typeof instagramSchema>;
export type TwitterFormValues = z.infer<typeof twitterSchema>;
export type FacebookFormValues = z.infer<typeof facebookSchema>;
export type BlueskyFormValues = z.infer<typeof blueskySchema>;
export type LinkedInFormValues = z.infer<typeof linkedinFormSchema>;
