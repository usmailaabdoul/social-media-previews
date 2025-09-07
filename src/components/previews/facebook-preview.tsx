import { useCallback, useEffect, useState } from "react";

import { type FacebookFormValues } from "../../lib/form-schema";
import { cn, formatNumberShort, truncateText } from "../../lib/utils";
import { formatFacebookDate, formatText } from "../../lib/format-text";
import { FacebookImageGrid } from "./facebookImageGrid";
import DefaultAvatar from "../defaultAvatar";
import { platformDimensions, SocialComponentProps } from "../../config/platform";

const defaultValues = {
  fullName: "John Doe",
  profilePicture: undefined,
  postText: "Just shared this amazing post on Facebook! #facebook #social",
  likeCount: 128,
  commentCount: 42,
  shareCount: 15,
  timestamp: new Date().toISOString(),
  verified: true,
  postImages: undefined,
  viewCount: 100,
};

export function FacebookPreview({ theme, values }: SocialComponentProps<FacebookFormValues>) {
  // const [showFullText, setShowFullText] = useState(false);
  const {
    fullName,
    profilePicture,
    postText,
    likeCount,
    commentCount,
    shareCount,
    timestamp,
    verified,
    postImages,
    viewCount,
  } = values || defaultValues;
  
  const { mobileWidth } = platformDimensions['facebook'];
  const [firstImageOrientation, setFirstImageOrientation] = useState<"landscape" | "portrait">('landscape');

  useEffect(() => {
    if (postImages && postImages.length > 0) {
      const img = document.createElement("img");
      img.onload = () => {
        const orientation = img.height > img.width ? "portrait" : "landscape";
        setFirstImageOrientation(orientation);
      };
      img.src = postImages[0];
    }
  }, [postImages]);

  // Helper to get formatted date
  const getFormattedDate = (timestamp?: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return formatFacebookDate(date);
  };

  const ShareIcon = useCallback(() => {
    if (theme === 'light') return (
      <i
        style={{
          backgroundImage: "url(https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/yFGS0mblS2E.png)",
          backgroundPosition: "0px -924px", 
          backgroundSize: "21px 1214px",
          width: "20px", 
          height: "20px", 
          backgroundRepeat: "no-repeat", 
          display: "inline-block",
          filter: "invert(39%) sepia(21%) saturate(200%) saturate(109.5%) hue-rotate(174deg) brightness(94%) contrast(86%)"
        }}
      ></i>
    )

    return (
      <i style={{
          backgroundImage: "url('https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/yFGS0mblS2E.png')",
          backgroundPosition: "0 -924px",
          backgroundSize: "21px 1214px",
          width: "20px",
          height: "20px",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
          filter: "invert(62%) sepia(98%) saturate(12%) hue-rotate(175deg) brightness(90%) contrast(96%)"
        }}
      ></i>
    )
  }, [theme])

  const formattedPostText = formatText(
    truncateText(postText || "", 280),
    {
      color: '#1877F2'
    }
  )

  return (
    <div
      style={{ ['--mobile-width' as string]: `${mobileWidth}px` }}
      className={cn(
      'facebook-post w-full',
      "sm:w-[var(--mobile-width)]",
      theme === 'dark' ? 'bg-[#252728] text-[#b0b2b7]' : 'bg-white text-[#66696d]', 
      'py-4 overflow-hidden'
    )}>
      {/* Post Header */}
      <div className="flex items-center mb-3 px-4 min-w-0 gap-3">
        {!profilePicture ? (
          <DefaultAvatar className="flex-shrink-0" />
        ) : (
          <div className="relative h-10 w-10 flex-shrink-0 rounded-full overflow-hidden">
            <img
              src={profilePicture}
              alt={fullName || "User"}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex min-w-0 items-center space-x-1">
            <p className={cn(
              "font-semibold min-w-0 truncate",
              theme === 'dark' ? 'text-white' : 'text-black', 
            )}>{fullName}</p>
            {verified && (
              <div className="flex-shrink-0">
                <img
                  src="/facebook-verified-badge.png"
                  width={16}
                  height={16}
                  alt="facebook-verified-badge"
                  className="h-4 w-4"
                />
              </div>
            )}
          </div>

          <div className="flex items-center text-xs" style={{ color: theme === 'dark' ? '#93A5B7' : '#42576C' }}>
            <span>{getFormattedDate(timestamp)}</span>
            <span className="mx-1">·</span>
            <span>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                <g fillRule="evenodd" transform="translate(-448 -544)">
                  <g>
                    <path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path>
                    <path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path>
                    <path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path>
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="flex flex-shrink-0">
          <button className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
              <g fillRule="evenodd" transform="translate(-446 -350)">
                <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        <div className={cn(
          "text-base whitespace-pre-line mb-3 px-4",
          theme === 'dark' ? 'text-white' : 'text-black',
        )}>
          <span
            dangerouslySetInnerHTML={{ __html: formattedPostText }}
          />
          {postText && postText.length > 280 && (
            <span
              className="font-semibold ml-1"
            >
              See more
            </span>
          )}
        </div>

        {/* Images display */}
        <FacebookImageGrid imageArray={postImages || []} firstImageOrientation={firstImageOrientation} />
      </div>

      {/* Like, Comment, Share Counts */}
      <div className="flex justify-between text-sm py-2 px-4 mb-2">
        <div className="flex items-center gap-1">
          <div className="flex">
            <div className={cn(
              "z-10 border-2 rounded-full ",
              theme === 'dark' ? 'border-[#252728]' : 'border-white',
            )}>
              <img height="18" alt="like icon" role="presentation" src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E" width="18"/>
            </div>
            <img className="-ml-[3px]" height="18" alt="like icon" role="presentation" src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clipPath='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E" width="18"/>
          </div>
          <span className="">
            {formatNumberShort(likeCount || 0)}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <span>{formatNumberShort(commentCount || 0)} comments</span>
          <span>{formatNumberShort(shareCount || 0)} shares</span>
          <span>{formatNumberShort(viewCount || 0)} views</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between py-1">
        <button className="flex items-center justify-center gap-1 py-1 px-2 flex-1 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg width="20" height="20" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 31C0 28.5147 2.01472 26.5 4.5 26.5H16.5C17.8807 26.5 19 27.6193 19 29V58C19 59.3807 17.8807 60.5 16.5 60.5H4.5C2.01472 60.5 0 58.4853 0 56V31ZM5 31.5V55.5H14V31.5H5Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5005 5.5C26.2244 5.5 26.0005 5.72386 26.0005 6V15C26.0005 15.3881 25.9102 15.7709 25.7366 16.118L18.2366 31.118C17.6191 32.353 16.1175 32.8535 14.8825 32.2361C13.6476 31.6186 13.147 30.1169 13.7645 28.882L21.0005 14.4098V6C21.0005 2.96243 23.463 0.5 26.5005 0.5H28.5005C33.7473 0.5 38.0005 4.75329 38.0005 10V21H49.6572C56.7261 21 61.7755 27.844 59.6896 34.5983L55.2193 49.0736C53.2132 55.5696 47.2081 60 40.4095 60H16.0005C14.6198 60 13.5005 58.8807 13.5005 57.5C13.5005 56.1193 14.6198 55 16.0005 55H40.4095C45.015 55 49.083 51.9987 50.4419 47.5983L54.9123 33.1229C56.0049 29.585 53.36 26 49.6572 26H35.5005C34.1198 26 33.0005 24.8807 33.0005 23.5V10C33.0005 7.51472 30.9858 5.5 28.5005 5.5H26.5005Z" fill="currentColor"/>
          </svg>
          <span className="">Like</span>
        </button>
        
        <button className="flex items-center justify-center gap-1 py-1 px-2 flex-1 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg width="21" height="20" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M60.0003 30C60.0003 13.4315 46.5689 0 30.0003 0C13.4318 0 0.00030899 13.4315 0.00030899 30C0.00030899 46.5685 13.4318 60 30.0003 60C35.9253 60 41.455 58.2799 46.1097 55.312L55.6783 58.661C58.4678 59.6373 61.1369 56.9305 60.1215 54.155L56.4606 44.1484C58.7197 39.9314 60.0003 35.112 60.0003 30ZM30.0003 5C43.8074 5 55.0003 16.1929 55.0003 30C55.0003 34.6245 53.747 38.9486 51.5631 42.6596C51.1839 43.304 51.113 44.0843 51.3699 44.7865L54.336 52.8938L46.5842 50.1807C45.8245 49.9148 44.9833 50.0309 44.3241 50.4926C40.2682 53.3334 35.3326 55 30.0003 55C16.1932 55 5.00031 43.8071 5.00031 30C5.00031 16.1929 16.1932 5 30.0003 5Z" fill="currentColor" />
          </svg>
          <span className="">Comment</span>
        </button>
        
        <button className="flex items-center justify-center gap-1 py-1 px-2 flex-1 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 48L3.374 35.674C1.292 32.066 0.198 27.976 0.2 23.782C0.206 10.67 10.876 0 23.986 0C30.348 0.002 36.32 2.48 40.812 6.976C45.302 11.472 47.774 17.448 47.772 23.804C47.766 36.918 37.096 47.588 23.986 47.588C20.006 47.586 16.084 46.588 12.61 44.692L0 48ZM13.194 40.386C16.546 42.376 19.746 43.568 23.978 43.57C34.874 43.57 43.75 34.702 43.756 23.8C43.76 12.876 34.926 4.02 23.994 4.016C13.09 4.016 4.22 12.884 4.216 23.784C4.214 28.234 5.518 31.566 7.708 35.052L5.71 42.348L13.194 40.386ZM35.968 29.458C35.82 29.21 35.424 29.062 34.828 28.764C34.234 28.466 31.312 27.028 30.766 26.83C30.222 26.632 29.826 26.532 29.428 27.128C29.032 27.722 27.892 29.062 27.546 29.458C27.2 29.854 26.852 29.904 26.258 29.606C25.664 29.308 23.748 28.682 21.478 26.656C19.712 25.08 18.518 23.134 18.172 22.538C17.826 21.944 18.136 21.622 18.432 21.326C18.7 21.06 19.026 20.632 19.324 20.284C19.626 19.94 19.724 19.692 19.924 19.294C20.122 18.898 20.024 18.55 19.874 18.252C19.724 17.956 18.536 15.03 18.042 13.84C17.558 12.682 17.068 12.838 16.704 12.82L15.564 12.8C15.168 12.8 14.524 12.948 13.98 13.544C13.436 14.14 11.9 15.576 11.9 18.502C11.9 21.428 14.03 24.254 14.326 24.65C14.624 25.046 18.516 31.05 24.478 33.624C25.896 34.236 27.004 34.602 27.866 34.876C29.29 35.328 30.586 35.264 31.61 35.112C32.752 34.942 35.126 33.674 35.622 32.286C36.118 30.896 36.118 29.706 35.968 29.458Z" fill="currentColor"/>
          </svg>
          <span className="">Send</span>
        </button>

        <button className="flex items-center justify-center gap-1 py-1 px-2 flex-1 font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <ShareIcon />
          <span className="">Share</span>
        </button>
      </div>
    </div>
  );
}
