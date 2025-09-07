import { useState } from "react";

import { type TwitterFormValues } from "../../lib/form-schema";
import { formatText, formatDate } from "../../lib/format-text";
import { cn, formatNumberShort, truncateText } from "../../lib/utils";
import DefaultAvatar from "../defaultAvatar";
import { platformDimensions, SocialComponentProps } from "../../config/platform";

const defaultValues = {
  displayName: "Display Name",
  handle: "@username",
  tweetText: "Just posted this amazing tweet! #twitter #social",
  retweetCount: 128,
  likeCount: 1024,
  commentCount: 1024,
  viewCount: 1234600,
  timestamp: new Date().toISOString(),
  profilePicture: undefined,
  verified: true,
  postImages: undefined,
};

export function TwitterPreview({ theme, values }: SocialComponentProps<TwitterFormValues>) {
  const [showFullText, setShowFullText] = useState(false);

  const {
    profilePicture,
    displayName,
    handle,
    tweetText,
    retweetCount,
    likeCount,
    timestamp,
    viewCount,
    commentCount,
    verified,
    postImages,
  } = values || defaultValues;

  const { mobileWidth } = platformDimensions['twitter'];

  // Format timestamp
  const formattedTimestamp = formatDate(timestamp ? new Date(timestamp) : undefined)
  
  const formattedTweet = formatText(
    showFullText ? tweetText : truncateText(tweetText),
    {
      color: '#4b9aea'
    }
  )

  return (
    <div 
      style={{ ['--mobile-width' as string]: `${mobileWidth}px` }}
      className={cn(
      `px-4 py-3 w-full bg-black text-white`,
      "sm:w-[var(--mobile-width)] overflow-hidden",
      {
        'bg-white text-black': theme === 'light'
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
        
        <div className="flex-1 -mt-[5px]">
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center space-x-[2px]">
              {/* 1. Don't let the name shrink */}
              <p className="min-w-0 truncate font-bold text-[15px]">{displayName}</p>

              {/* The verified badge */}
              {verified && (
                <div className="flex-shrink-0">
                  <img
                    src="/x-verified-bagde.png"
                    width={16}
                    height={16}
                    alt="x-verified-bagde"
                    className="h-4 w-4"
                  />
                </div>
              )}

              {/* 2. This is the element we want to truncate */}
              <p className="min-w-0 truncate text-[#7C7C7C] text-sm">{handle}</p>

              {/* 3. Don't let the dot and timestamp shrink */}
              <p className="flex-shrink-0 text-[#7C7C7C]">·</p>
              <p className="flex-shrink-0 text-sm text-[#7C7C7C]">{formattedTimestamp}</p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-[6px]">
              <svg width="16" height="16" viewBox="0 0 33 32" aria-hidden="true">
                <g>
                  <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466" fill="#6D6D6D" />
                </g>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <g>
                  <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="#6D6D6D" />
                </g>
              </svg>
            </div>
          </div>
          
          <div className="whitespace-pre-wrap text-[15px] leading-[16px]">
            <div 
              className={`whitespace-pre-line`}
              dangerouslySetInnerHTML={{ __html: formattedTweet }}
            />
            {tweetText.length > 280 && (
              <button 
                className="text-[#4b9aea] hover:underline font-medium mt-1 block"
                onClick={() => setShowFullText(!showFullText)}
              >
                {showFullText ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          
          
          {postImages && postImages.length > 0 && (
            <div className={cn(
              "mt-2.5 border-[1px] border-[#2F3336] rounded-2xl overflow-hidden",
              {
                'border-[#EFF3F4]': theme === 'light'
              }
            )}>
              <img 
                src={postImages[0]}
                width={450}
                height={400}
                alt="x-media"
                className="w-full h-auto"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between text-[#7C7C7C] text-xl mt-[5px] -mx-1">
            {/* comments */}
            <div className='p-1 flex items-center gap-[2px]'>
              <svg width="16" height="16" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.44635 8.53512C1.44635 4.90506 4.38982 1.96487 8.0207 1.96487H11.6064C15.294 1.96487 18.2826 4.95434 18.2826 8.64189C18.2826 11.0729 16.9628 13.3068 14.8365 14.4812L8.22192 18.1441V15.1136H8.16689C4.47934 15.1957 1.44635 12.2309 1.44635 8.53512ZM8.0207 3.60744C5.29651 3.60744 3.08891 5.81668 3.08891 8.53512C3.08891 11.3028 5.36386 13.5285 8.12993 13.471L8.4182 13.4628H9.86448V15.3518L14.0423 13.044C15.6447 12.157 16.64 10.4733 16.64 8.64189C16.64 5.85775 14.3865 3.60744 11.6064 3.60744H8.0207Z" fill="#6D6D6D"/>
              </svg>
              <span className="text-[#6D6D6D] text-[12px]">{formatNumberShort(commentCount ?? 0)}</span>
            </div>

            {/* retweet */}
            <div className='p-1 flex items-center gap-[2px]'>
              <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_3_363)">
                <path d="M4.25778 3.50888L7.89769 6.90898L6.77747 8.10805L5.07906 6.52298V13.4628C5.07906 14.3662 5.81493 15.1054 6.72162 15.1054H11.2387V16.7479H6.72162C4.90741 16.7479 3.4365 15.2778 3.4365 13.4628V6.52298L1.73809 8.10805L0.617859 6.90898L4.25778 3.50888ZM14.1131 5.25H9.5961V3.60743H14.1131C15.9274 3.60743 17.3983 5.07753 17.3983 6.89256V13.8324L19.0967 12.2473L20.2169 13.4464L16.577 16.8465L12.9371 13.4464L14.0573 12.2473L15.7557 13.8324V6.89256C15.7557 5.98915 15.0198 5.25 14.1131 5.25Z" fill="#6D6D6D"/>
                </g>
                <defs>
                <clipPath id="clip0_3_363">
                <rect x="0.562012" y="0.322327" width="19.7107" height="19.7107" fill="white"/>
                </clipPath>
                </defs>
              </svg>
              <span className="text-[#6D6D6D] text-[12px]">{formatNumberShort(retweetCount ?? 0)}</span>
            </div>

            {/* like */}
            <div className='p-1 flex items-center gap-[2px]'>
              <svg width="16" height="16" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8287 4.83935C12.8251 4.79008 11.6285 5.25821 10.6339 6.61332L9.97276 7.50852L9.31081 6.61332C8.31542 5.25821 7.11799 4.79008 6.11438 4.83935C5.09353 4.89684 4.1852 5.47995 3.72446 6.408C3.27111 7.32783 3.20459 8.69116 4.11785 10.3666C4.99991 11.9845 6.79276 13.8734 9.97276 15.7952C13.1511 13.8734 14.9432 11.9845 15.8252 10.3666C16.7377 8.69116 16.6711 7.32783 16.217 6.408C15.7562 5.47995 14.8487 4.89684 13.8287 4.83935ZM17.2674 11.155C16.1578 13.1918 13.9814 15.36 10.3859 17.4542L9.97276 17.7006L9.55884 17.4542C5.96245 15.36 3.78605 13.1918 2.67486 11.155C1.55792 9.1018 1.51685 7.16358 2.25272 5.67706C2.9812 4.20697 4.42665 3.28713 6.03144 3.205C7.38737 3.13109 8.79751 3.66492 9.97194 4.85578C11.1456 3.66492 12.5557 3.13109 13.9108 3.205C15.5156 3.28713 16.961 4.20697 17.6895 5.67706C18.4254 7.16358 18.3843 9.1018 17.2674 11.155Z" fill="#6D6D6D"/>
              </svg>
              <span className="text-[#6D6D6D] text-[12px]">{formatNumberShort(likeCount ?? 0)}</span>
            </div>

            {/* stats */}
            <div className='p-1 flex items-center gap-[2px]'>
              <svg width="16" height="16" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.85564 17.5692V2.78616H9.4982V17.5692H7.85564ZM15.4525 17.5692V7.30321H17.0951V17.5692H15.4525ZM3.95456 17.5692L3.95784 9.35641H5.6004L5.59712 17.5692H3.95456ZM11.5498 17.5692V11.8203H13.1923V17.5692H11.5498Z" fill="#6D6D6D"/>
              </svg>
              <span className="text-[#6D6D6D] text-[12px]">{formatNumberShort(viewCount ?? 0)}</span>
            </div>

            <div  className="flex items-center gap-[2px]">
              {/* save */}
              <div className='p-1 flex items-center'>
                <svg width="16" height="16" viewBox="0 0 64 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.7864 3.7948H41.1155C46.4035 3.7948 50.0009 3.80276 52.6946 4.16492C55.2829 4.5129 56.4822 5.12635 57.2982 5.94226C58.1139 6.75814 58.7275 7.95698 59.0755 10.5448C59.4377 13.2385 59.4456 16.836 59.4456 22.1239V70.3729L33.9427 53.8719L31.9515 52.5829L29.9593 53.8719L4.45734 70.3729V22.1239C4.45734 16.836 4.46529 13.2385 4.82745 10.5448C5.17545 7.95673 5.78892 6.75814 6.6048 5.94226C7.42068 5.12638 8.61927 4.51291 11.2073 4.16492C13.9011 3.80275 17.4985 3.7948 22.7864 3.7948Z" stroke="#6D6D6D" strokeWidth="7.33173"/>
                </svg>
              </div>

              {/* share */}
              <div className='p-1 flex items-center'>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.76447 0.322327L14.174 5.61136L12.8358 6.92898L9.7135 3.86691V12.7655H7.81543V3.86691L4.68361 6.92898L3.34547 5.61136L8.76447 0.322327ZM17.3058 11.8376L17.2868 15.0945C17.2868 16.375 16.2239 17.405 14.9142 17.405H2.59573C1.27657 17.405 0.223145 16.3657 0.223145 15.0852V11.8376H2.12122V15.0852C2.12122 15.345 2.33 15.5492 2.59573 15.5492H14.9142C15.1799 15.5492 15.3887 15.345 15.3887 15.0852L15.4077 11.8376H17.3058Z" fill="#6D6D6D"/>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
