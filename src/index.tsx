import React from 'react'

import {
  FacebookFormValues,
  TwitterFormValues,
  InstagramFormValues,
  BlueskyFormValues,
  LinkedInFormValues,
} from './lib/form-schema';
import { FacebookPreview } from "./components/previews/facebook-preview";
import { InstagramPreview } from "./components/previews/instagram-preview";
import { TwitterPreview } from "./components/previews/twitter-preview";
import { BlueskyPreview } from "./components/previews/bluesky-preview";
import { LinkedInPreview } from "./components/previews/linkedin-preview";

export type GeneralPreviewProps =
  | { platform: "facebook"; theme: "light" | "dark"; values: FacebookFormValues }
  | { platform: "twitter"; theme: "light" | "dark"; values: TwitterFormValues }
  | { platform: "instagram"; theme: "light" | "dark"; values: InstagramFormValues }
  | { platform: "bluesky"; theme: "light" | "dark"; values: BlueskyFormValues }
  | { platform: "linkedin"; theme: "light" | "dark"; values: LinkedInFormValues };

export const SocialMediaPreview = ({
  platform,
  theme,
  values
}: GeneralPreviewProps) => {

  const renderPreview = () => {
    switch (platform) {
      case "facebook":
        return <FacebookPreview theme={theme} values={values} />;
      case "twitter":
        return <TwitterPreview theme={theme} values={values} />;
      case "instagram":
        return <InstagramPreview theme={theme} values={values} />;
      case "bluesky":
        return <BlueskyPreview theme={theme} values={values} />;
      case "linkedin":
        return <LinkedInPreview theme={theme} values={values} />;
      default:
        return null;
    }
  }
  return (
    <div>
      {renderPreview()}
    </div>
  )
}

export type {
  FacebookFormValues,
  TwitterFormValues,
  InstagramFormValues,
  BlueskyFormValues,
  LinkedInFormValues,
}

export {
  FacebookPreview,
  TwitterPreview,
  InstagramPreview,
  BlueskyPreview,
  LinkedInPreview,
}
