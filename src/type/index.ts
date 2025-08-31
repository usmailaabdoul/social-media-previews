
export type theme = 'light' | 'dark'

export type supportedPlatform = 'twitter' | 'instagram' | 'facebook' | 'bluesky' | 'linkedin'
export interface platformProp {
  label: string,
  value: supportedPlatform,
  logo: React.ReactNode
}