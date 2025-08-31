# Social Media Previews

A React component library for rendering social media platform previews. Perfect for social media management tools, content scheduling apps, or any application that needs to show how posts will appear across different platforms.

> 🎨 **Try it live**: See these components in action at [Social Mocker](https://social-mocker.vercel.app/) - a free web app that lets you create pixel-perfect social media post mockups with customizable content and export them as high-resolution images.

## Features

- 🎨 **Multi-platform support**: Facebook, Twitter, Instagram, LinkedIn, and Bluesky
- 🌓 **Theme support**: Light and dark modes for all platforms
- 📱 **Responsive design**: Optimized layouts that match each platform's design
- 🔧 **TypeScript ready**: Full TypeScript support with type definitions
- 🎯 **Zero dependencies**: Only requires React as a peer dependency
- ⚡ **Lightweight**: Minimal bundle size with tree-shaking support

## Installation

```bash
npm install social-media-previews
```

## Platform Previews

| Platform | Light Mode | Dark Mode |
|----------|------------|-----------|
| Facebook | ![Facebook Light](./screenshots/facebook-light.png) | ![Facebook Dark](./screenshots/facebook-dark.png) |
| Twitter/X | ![Twitter Light](./screenshots/twitter-light.png) | ![Twitter Dark](./screenshots/twitter-dark.png) |
| Instagram | ![Instagram Light](./screenshots/instagram-light.png) | ![Instagram Dark](./screenshots/instagram-dark.png) |
| LinkedIn | ![LinkedIn Light](./screenshots/linkedin-light.png) | ![LinkedIn Dark](./screenshots/linkedin-dark.png) |
| Bluesky | ![Bluesky Light](./screenshots/bluesky-light.png) | ![Bluesky Dark](./screenshots/bluesky-dark.png) |

## Quick Start

The primary way to use this library is through the `SocialMediaPreview` component:

```tsx
import { SocialMediaPreview, FacebookFormValues } from 'social-media-previews';

const MyComponent = () => {
  const facebookData: FacebookFormValues = {
    fullName: "John Doe",
    postText: "Check out this amazing content!",
    profilePicture: "https://example.com/avatar.jpg",
    postImages: ["https://example.com/image1.jpg"],
    likeCount: 42,
    commentCount: 8,
    shareCount: 3,
    timestamp: new Date().toISOString(),
    verified: true
  };

  return (
    <SocialMediaPreview
      platform="facebook"
      theme="light"
      values={facebookData}
    />
  );
};
```

## Props Documentation

### SocialMediaPreview Props

The main component accepts a discriminated union of props based on the platform:

| Prop | Type | Description |
|------|------|-------------|
| `platform` | `"facebook" \| "twitter" \| "instagram" \| "linkedin" \| "bluesky"` | The social media platform to render |
| `theme` | `"light" \| "dark"` | The theme mode for the preview |
| `values` | Platform-specific values object | Data to display in the preview |

### Platform-Specific Value Types

#### FacebookFormValues
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `fullName` | `string` | ✅ | - | User's display name |
| `postText` | `string` | ❌ | - | The post content text |
| `profilePicture` | `string` | ❌ | - | URL to profile picture |
| `postImages` | `string[]` | ❌ | - | Array of image URLs |
| `likeCount` | `number` | ❌ | `0` | Number of likes |
| `commentCount` | `number` | ❌ | `0` | Number of comments |
| `shareCount` | `number` | ❌ | `0` | Number of shares |
| `viewCount` | `number` | ❌ | `0` | Number of views |
| `timestamp` | `string` | ❌ | Current time | ISO timestamp |
| `verified` | `boolean` | ❌ | `true` | Verification badge |

#### TwitterFormValues
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `displayName` | `string` | ✅ | - | User's display name |
| `handle` | `string` | ✅ | - | Twitter handle (must start with @) |
| `tweetText` | `string` | ✅ | - | The tweet content |
| `profilePicture` | `string` | ❌ | - | URL to profile picture |
| `postImages` | `string[]` | ❌ | - | Array of image URLs |
| `likeCount` | `number` | ❌ | `0` | Number of likes |
| `commentCount` | `number` | ❌ | `0` | Number of replies |
| `retweetCount` | `number` | ❌ | `0` | Number of retweets |
| `viewCount` | `number` | ❌ | `0` | Number of views |
| `timestamp` | `string` | ❌ | Current time | ISO timestamp |
| `verified` | `boolean` | ❌ | `true` | Verification badge |

#### InstagramFormValues
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `username` | `string` | ✅ | - | Instagram username |
| `fullName` | `string` | ✅ | - | User's full name |
| `caption` | `string` | ❌ | - | Post caption |
| `location` | `string` | ❌ | - | Location tag |
| `profilePicture` | `string` | ❌ | - | URL to profile picture |
| `postImages` | `string[]` | ❌ | - | Array of image URLs |
| `likeCount` | `number` | ❌ | `0` | Number of likes |
| `commentCount` | `number` | ❌ | `0` | Number of comments |
| `timestamp` | `string` | ❌ | Current time | ISO timestamp |
| `verified` | `boolean` | ❌ | `true` | Verification badge |

#### LinkedInFormValues
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `fullName` | `string` | ✅ | - | User's full name |
| `headline` | `string` | ❌ | - | Professional headline |
| `postText` | `string` | ✅ | - | Post content |
| `profilePicture` | `string` | ❌ | - | URL to profile picture |
| `postImages` | `string[]` | ❌ | - | Array of image URLs |
| `likeCount` | `number` | ❌ | `0` | Number of likes |
| `commentCount` | `number` | ❌ | `0` | Number of comments |
| `repostCount` | `number` | ❌ | `0` | Number of reposts |
| `timestamp` | `string` | ❌ | Current time | ISO timestamp |
| `verified` | `boolean` | ❌ | `true` | Verification badge |

#### BlueskyFormValues
| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `displayName` | `string` | ✅ | - | User's display name |
| `handle` | `string` | ✅ | - | Bluesky handle |
| `postText` | `string` | ✅ | - | Post content |
| `profilePicture` | `string` | ❌ | - | URL to profile picture |
| `postImages` | `string[]` | ❌ | - | Array of image URLs |
| `likeCount` | `number` | ❌ | `0` | Number of likes |
| `commentCount` | `number` | ❌ | `0` | Number of replies |
| `repostCount` | `number` | ❌ | `0` | Number of reposts |
| `shareCount` | `number` | ❌ | `0` | Number of shares |
| `timestamp` | `string` | ❌ | Current time | ISO timestamp |
| `verified` | `boolean` | ❌ | `true` | Verification badge |

## Using Individual Platform Components

While `SocialMediaPreview` is the recommended approach, you can also import and use individual platform components:

```tsx
import { 
  FacebookPreview, 
  TwitterPreview, 
  InstagramPreview, 
  LinkedInPreview, 
  BlueskyPreview,
  type FacebookFormValues 
} from 'social-media-previews';

// Using individual components
const MyFacebookPreview = () => {
  const data: FacebookFormValues = {
    fullName: "John Doe",
    postText: "Hello World!"
  };

  return <FacebookPreview theme="light" values={data} />;
};

const MyTwitterPreview = () => {
  const data: TwitterFormValues = {
    displayName: "John Doe",
    handle: "@johndoe",
    tweetText: "Hello Twitter!"
  };

  return <TwitterPreview theme="dark" values={data} />;
};
```

## Examples

### Basic Usage with Different Platforms

```tsx
import { SocialMediaPreview } from 'social-media-previews';
import type { 
  FacebookFormValues, 
  TwitterFormValues, 
  InstagramFormValues 
} from 'social-media-previews';

// Facebook Example
const facebookPost: FacebookFormValues = {
  fullName: "Tech Company",
  postText: "We're excited to announce our new product launch! 🚀",
  likeCount: 156,
  commentCount: 24,
  shareCount: 8,
  verified: true
};

// Twitter Example  
const tweet: TwitterFormValues = {
  displayName: "Tech Company",
  handle: "@techcompany",
  tweetText: "Just shipped a major update to our platform! Here's what's new:",
  likeCount: 89,
  retweetCount: 34,
  commentCount: 12
};

// Instagram Example
const instagramPost: InstagramFormValues = {
  username: "techcompany",
  fullName: "Tech Company",
  caption: "Behind the scenes at our office 📸 #techlife #innovation",
  location: "San Francisco, CA",
  likeCount: 234,
  commentCount: 18
};

const App = () => {
  return (
    <div className="space-y-8">
      <SocialMediaPreview 
        platform="facebook" 
        theme="light" 
        values={facebookPost} 
      />
      
      <SocialMediaPreview 
        platform="twitter" 
        theme="dark" 
        values={tweet} 
      />
      
      <SocialMediaPreview 
        platform="instagram" 
        theme="light" 
        values={instagramPost} 
      />
    </div>
  );
};
```

### With Images

```tsx
const postWithImages: FacebookFormValues = {
  fullName: "Travel Blogger",
  postText: "Amazing sunset from my latest adventure! 🌅",
  postImages: [
    "https://example.com/sunset1.jpg",
    "https://example.com/sunset2.jpg",
    "https://example.com/sunset3.jpg"
  ],
  likeCount: 89,
  commentCount: 15,
  profilePicture: "https://example.com/profile.jpg"
};

<SocialMediaPreview 
  platform="facebook" 
  theme="light" 
  values={postWithImages} 
/>
```

## TypeScript Support

The library is written in TypeScript and provides full type support:

```tsx
import type { 
  GeneralPreviewProps,
  FacebookFormValues,
  TwitterFormValues,
  InstagramFormValues,
  LinkedInFormValues,
  BlueskyFormValues 
} from 'social-media-previews';

// Type-safe platform switching
const renderPreview = (platform: string, data: any) => {
  switch (platform) {
    case 'facebook':
      return <SocialMediaPreview platform="facebook" theme="light" values={data as FacebookFormValues} />;
    case 'twitter':
      return <SocialMediaPreview platform="twitter" theme="light" values={data as TwitterFormValues} />;
    // ... other platforms
  }
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Changelog

### v1.0.0
- Initial release
- Support for Facebook, Twitter, Instagram, LinkedIn, and Bluesky
- Light and dark theme support
- TypeScript definitions
- Responsive design