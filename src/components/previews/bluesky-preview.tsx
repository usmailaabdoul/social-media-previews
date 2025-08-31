import { useState } from "react";

import { type BlueskyFormValues } from "../../lib/form-schema";
import { formatDate, formatText } from "../../lib/format-text";
import { cn, formatNumberShort, truncateText } from "../../lib/utils";
import DefaultAvatar from "../defaultAvatar";
import { platformDimensions, SocialComponentProps } from "../../config/platform";

const defaultValues = {
  displayName: "Display Name",
  handle: "username.bsky.social",
  postText: "Just posted this on Bluesky! #bluesky #social",
  repostCount: 24,
  likeCount: 128,
  replyCount: 16,
  shareCount: 32,
  timestamp: new Date().toISOString(),
  profilePicture: undefined,
  verified: true,
  postImages: undefined,
};

export function BlueskyPreview({ form, theme, values }: SocialComponentProps<BlueskyFormValues>) {
  const [showFullText, setShowFullText] = useState(false);
  const formValues = form ? form.watch() : values;
  const {
    profilePicture,
    displayName,
    handle,
    postText,
    repostCount,
    likeCount,
    timestamp,
    replyCount,
    verified,
    postImages,
    shareCount
  } = formValues || defaultValues;

  const { mobileWidth } = platformDimensions['bluesky'];

  // Format timestamp
  const formattedTimestamp = formatDate(timestamp ? new Date(timestamp) : undefined)
  const formattedPostText = formatText(
    showFullText ? postText : truncateText(postText, 300),
    {
      color: theme === 'light' ? '#1083fe' : '#208bfe'
    }
  )

  return (
    <div 
      style={{ ['--mobile-width' as string]: `${mobileWidth}px` }}
      className={cn(
      `px-4 py-3 w-full bg-white text-[#0b0f14]`,
      "sm:w-[var(--mobile-width)] overflow-hidden",
      {
        'bg-[#171E27] text-[#f1f3f5]': theme === 'dark'
      }
    )}>
      <div className="flex items-start space-x-2">
        {!profilePicture ? (
            <DefaultAvatar className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden relative" />
          ) : (
          <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden relative">
            <img
              src={profilePicture}
              alt="Profile picture"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="flex-1 -mt-[2px]">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center space-x-[2px]">
              {/* 1. Don't let the name shrink */}
              <p className="min-w-0 truncate font-bold text-[15px]">{displayName}</p>

              {/* The verified badge */}
              {verified && (
                <div className="flex-shrink-0">
                  <img
                    src="/bluesky-badge.png"
                    width={16}
                    height={16}
                    alt="bluesky-badge"
                    className="h-3 w-3"
                  />
                </div>
              )}

              {/* 2. This is the element we want to truncate */}
              <p className={cn(
                "min-w-0 truncate text-sm",
                {
                  'text-[#42576c]': theme === 'light',
                  'text-[#93a5b7]': theme === 'dark'
                }
              )}>{handle}</p>

              {/* 3. Don't let the dot and timestamp shrink */}
              <p className={cn(
                "flex-shrink-0  text-sm",
                {
                  'text-[#42576c]': theme === 'light',
                  'text-[#93a5b7]': theme === 'dark'
                }
              )}>·</p>
              <p className={cn(
                "flex-shrink-0 text-sm",
                {
                  'text-[#42576c]': theme === 'light',
                  'text-[#93a5b7]': theme === 'dark'
                }
              )}>{formattedTimestamp}</p>
            </div>
          </div>
          
          <div className="whitespace-pre-wrap text-[15px] leading-[20px]">
            <div 
              dangerouslySetInnerHTML={{ __html: formattedPostText }}
            />
            {postText.length > 300 && (
              <button 
                className="text-[#0560ff] hover:underline font-medium mt-1 block"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          
          
          {postImages && postImages.length > 0 && (
            <div className={cn(
              "mt-2.5 border-[1px] border-gray-200 rounded-md overflow-hidden",
              {
                'border-gray-800': theme === 'dark'
              }
            )}>
              <img 
                src={postImages[0]}
                width={450}
                height={400}
                alt="bluesky-media"
                className="w-full h-auto"
              />
            </div>
          )}

          <div className={cn("flex items-center justify-between mt-2", {
              'text-[#6f869f]': theme === 'light',
              'text-[#788ea5]': theme === 'dark'
            })}>
            {/* replies */}
            <div className='flex items-center gap-1'>
              <svg fill="none" width="18" viewBox="0 0 24 24" height="18">
                <path fill={`${theme === 'light' ? '#6f869f' : '#788ea5'}`} fill-rule="evenodd" clip-rule="evenodd" d="M2.002 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12.28l-4.762 2.858A1 1 0 0 1 6.002 21v-2h-1a3 3 0 0 1-3-3V6Zm3-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v1.234l3.486-2.092a1 1 0 0 1 .514-.142h7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-14Z"></path>
              </svg>
              <span className="text-[14px]">{formatNumberShort(replyCount ?? 0)}</span>
            </div>

            {/* repost */}
            <div className='flex items-center gap-1'>
              <svg fill="none" width="18" viewBox="0 0 24 24" height="18">
                <path fill={`${theme === 'light' ? '#6f869f' : '#788ea5'}`} fill-rule="evenodd" clip-rule="evenodd" d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"></path>
              </svg>
              <span className="text-[14px]">{formatNumberShort(repostCount ?? 0)}</span>
            </div>

            {/* like */}
            <div className='flex items-center gap-1'>
              <svg fill="none" width="18" viewBox="0 0 24 24" height="18">
                <path fill={`${theme === 'light' ? '#6f869f' : '#788ea5'}`} fill-rule="evenodd" clip-rule="evenodd" d="M16.734 5.091c-1.238-.276-2.708.047-4.022 1.38a1 1 0 0 1-1.424 0C9.974 5.137 8.504 4.814 7.266 5.09c-1.263.282-2.379 1.206-2.92 2.556C3.33 10.18 4.252 14.84 12 19.348c7.747-4.508 8.67-9.168 7.654-11.7-.541-1.351-1.657-2.275-2.92-2.557Zm4.777 1.812c1.604 4-.494 9.69-9.022 14.47a1 1 0 0 1-.978 0C2.983 16.592.885 10.902 2.49 6.902c.779-1.942 2.414-3.334 4.342-3.764 1.697-.378 3.552.003 5.169 1.286 1.617-1.283 3.472-1.664 5.17-1.286 1.927.43 3.562 1.822 4.34 3.764Z"></path>
              </svg>
              <span className="text-[14px]">{formatNumberShort(likeCount ?? 0)}</span>
            </div>

            <div className='flex items-center gap-1'>
              <svg fill="none" width="18" viewBox="0 0 24 24" height="18">
                <path fill={`${theme === 'light' ? '#6f869f' : '#788ea5'}`} fill-rule="evenodd" clip-rule="evenodd" d="M20 13.75a1 1 0 0 1 1 1V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3.25a1 1 0 1 1 2 0V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.25a1 1 0 0 1 1-1ZM12 3a1 1 0 0 1 .707.293l4.5 4.5a1 1 0 1 1-1.414 1.414L13 6.414v8.836a1 1 0 1 1-2 0V6.414L8.207 9.207a1 1 0 1 1-1.414-1.414l4.5-4.5A1 1 0 0 1 12 3Z"></path>
              </svg>
              <span className="text-[14px]">{formatNumberShort(shareCount ?? 0)}</span>
            </div>

            <div className="flex flex-shrink-0 items-center">
              <svg fill="none" width="18" viewBox="0 0 24 24" height="18">
                <path fill={`${theme === 'light' ? '#6f869f' : '#788ea5'}`} fill-rule="evenodd" clip-rule="evenodd" d="M2 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm16 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
