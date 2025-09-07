import { type LinkedInFormValues } from "../../lib/form-schema";
import { cn, formatNumberShort, formatRelativeTime, truncateText } from "../../lib/utils";
import { platformDimensions, SocialComponentProps } from "../../config/platform";
import { formatText } from "../../lib/format-text";
import DefaultAvatar from "../defaultAvatar";

const defaultValues = {
  fullName: "John Doe",
  headline: "Senior Software Engineer at Tech Company",
  postText: "Excited to share that I've started a new position as Senior Software Engineer at Tech Company!",
  likeCount: 423,
  commentCount: 55,
  repostCount: 9874,
  timestamp: new Date().toISOString(),
  verified: false,
  profilePicture: undefined,
  postImages: undefined,
}

export const LinkedInPreview = ({ theme, values }: SocialComponentProps<LinkedInFormValues>) => {
  
  const {
    fullName,
    headline,
    postText,
    profilePicture,
    likeCount,
    commentCount,
    repostCount,
    timestamp,
    postImages,
    verified,
  } = values || defaultValues;

  const formattedPostText = formatText(
    truncateText(postText, 250),
    {
      color: '#0a66c2',
      fontWeight: 'bold'
    }
  )

  const renderPostImages = () => {
    if (!postImages || postImages.length === 0) return null;

    if (postImages.length === 1) {
      return (
        <div className="mt-2 overflow-hidden">
          <img 
            src={postImages[0]}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      );
    } else {
      // Grid layout for multiple images
      return (
        <div className="mt-2 grid gap-1 overflow-hidden" 
             style={{ 
               gridTemplateColumns: postImages.length === 2 ? '1fr 1fr' : 'repeat(auto-fill, minmax(150px, 1fr))',
             }}>
          {postImages && postImages.map((image: string, index: number) => (
            <div key={index} className="relative h-32 md:h-48">
              <img 
                src={image}
                alt={`Post image ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      );
    }
  };

  const { mobileWidth } = platformDimensions['linkedin'];
  const bgColor = theme === "dark" ? "bg-[#1B1F23]" : "bg-white";
  const textColor = theme === "dark" ? "text-[#ffffffe6]" : "text-[#000000e6]";
  const secondaryTextColor = theme === "dark" ? "text-[#ffffff99]" : "text-[#00000099]";
  const borderColor = theme === "dark" ? "border-[#8c8c8c40]" : "border-[#8c8c8c33]";
  const iconTextColor = theme === "dark" ? "text-[#ffffffbf]" : "text-[#000000bf]";
  const iconColor = theme === "dark" ? "#ffffffbf" : "#000000bf";

  return (
    <div 
      style={{ ['--mobile-width' as string]: `${mobileWidth}px` } }
      className={`linkedin-preview w-full max-w-lg ${bgColor} shadow-md overflow-hidden`}>
      <div className={`pt-4 pb-2`}>
        {/* Header with profile info */}
        <div className="mx-4 flex items-center ">
          <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
            {profilePicture ? (
              <img 
                src={profilePicture}
                alt={fullName}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            ) : (
              <DefaultAvatar className="h-12 w-12" />
            )}
          </div>
          
          <div className="ml-[10px] flex-1">
            <div className="flex items-center">
              <h3 className={`font-semibold text-base ${textColor}`}>
                {fullName}
                {/* {verified && (
                  <span className="ml-1 inline-block">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill={linkedInBlue}>
                      <path d="M13.5 2.5a2 2 0 10-4 0 2 2 0 004 0zM13 6H9V5h4v1zm-9.5-3.5a2 2 0 100-4 2 2 0 000 4zM11 8c-1.5 0-3 .5-3.9 1.4-.7.7-1.1 1.6-1.1 2.6v4h10V12c0-1-.4-1.9-1.1-2.6-.9-.9-2.4-1.4-3.9-1.4zM5 7H1V6h4v1zM3.5 9h-2v6H5v-4c0-.8.2-1.6.5-2.3-.6-.5-1.3-.7-2-.7z"></path>
                    </svg>
                  </span>
                )} */}
              </h3>
            </div>
            
            <p className={`text-xs ${secondaryTextColor} -mt-[2px]`}>
              {headline}
            </p>
            
            <p className={`text-xs ${secondaryTextColor} flex items-center`}>
              {timestamp ? formatRelativeTime(timestamp) : ''}
              <span className="mx-1">•</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width="16" height="16" focusable="false">
                <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>
              </svg>
            </p>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="mt-3">
          <div 
            className={`${textColor} whitespace-pre-line mx-4`}
            dangerouslySetInnerHTML={{ __html: formattedPostText }}
          />
          
          {renderPostImages()}
        </div>
        
        {/* Engagement Stats */}
        <div className={cn(
          "flex justify-between text-xs mt-3 mx-4",
          secondaryTextColor
        )}>
          <div className="flex items-center gap-1">
            <div className="flex">
              <div className={cn(
              )}>
                <img src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="like"></img>
              </div>
              <div className={cn(
                "-ml-[5px] rounded-full p-0",
                bgColor
              )}>
                <img src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpme8epox8rdcds22" alt="love"></img>
              </div>
              <div className={cn(
                "-ml-[4px] rounded-full p-0",
                bgColor
              )}>
                <img src="https://static.licdn.com/aero-v1/sc/h/lhxmwiwoag9qepsh4nc28zus" alt="insightful"></img>
              </div>
            </div>
            <span className="">
              {formatNumberShort(likeCount || 0)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>{formatNumberShort(commentCount || 0)} comments</span>
            <span>•</span>
            <span>{formatNumberShort(repostCount || 0)} repost</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className={cn(`mx-4 py-4 flex justify-between`, borderColor, 'border-t')}>
        <button className={`flex items-center rounded-md hover:bg-gray-100 ${iconTextColor} hover:bg-opacity-50`}>
          <svg width="16" height="16" viewBox="0 0 59 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55.8606 61.2274L56.2278 39.2769C56.2278 37.7015 55.6508 36.1261 54.4967 34.9708L38.0257 18.219C36.452 16.5911 35.0881 14.7532 34.0915 12.7052L30.7343 5.98353C29.4754 3.46289 26.5379 2.20248 23.8626 3.0952C20.9251 4.04044 19.2465 7.19121 20.0858 10.132L22.7086 19.2694L24.9642 27.0938C25.2789 28.1966 24.4396 29.2992 23.3381 29.2992H7.28664C4.6114 29.2992 2.46071 31.4524 2.46071 34.1305C2.46071 35.916 3.40491 37.5439 4.97858 38.3841L5.97524 38.9618C5.97524 38.9618 -2.62748 44.003 5.97524 48.9393C5.97524 48.9393 2.09353 57.9716 11.4306 57.9716C11.4306 57.9716 9.48978 64.4306 17.8827 64.4306H41.9074C43.9007 64.4306 45.7891 63.9056 47.5201 62.9078L49.5135 61.7525C50.2478 61.3324 51.1396 61.0699 51.9789 61.1224H55.8081L55.8606 61.2274Z" stroke={iconColor} stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span className="ml-1.5 text-sm">Like</span>
        </button>
        
        <button className={`flex items-center rounded-md hover:bg-gray-100 ${iconTextColor} hover:bg-opacity-50`}>
          <svg width="16" height="16" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.30164 1.54999H14.3016C17.6153 1.54999 20.3016 4.23628 20.3016 7.54999C20.3016 9.51496 19.3583 11.2596 17.8954 12.3557L17.8778 12.3683L17.8612 12.382L11.8016 17.3391V13.55H7.30164C3.98793 13.55 1.30164 10.8637 1.30164 7.54999C1.30164 4.23628 3.98793 1.54999 7.30164 1.54999Z" stroke={iconColor} stroke-width="2"/>
            <line x1="7.17078" y1="5.79999" x2="15.1708" y2="5.79999" stroke={iconColor} stroke-width="1.5"/>
            <line x1="7.17078" y1="8.79999" x2="12.8851" y2="8.79999" stroke={iconColor} stroke-width="1.5"/>
          </svg>

          <span className="ml-1.5 text-sm">Comment</span>
        </button>
        
        <button className={`flex items-center rounded-md hover:bg-gray-100 ${iconTextColor} hover:bg-opacity-50`}>
          <svg className="rotate-90" width="16" height="16" viewBox="0 0 21 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3_363)">
            <path d="M4.25778 3.50888L7.89769 6.90898L6.77747 8.10805L5.07906 6.52298V13.4628C5.07906 14.3662 5.81493 15.1054 6.72162 15.1054H11.2387V16.7479H6.72162C4.90741 16.7479 3.4365 15.2778 3.4365 13.4628V6.52298L1.73809 8.10805L0.617859 6.90898L4.25778 3.50888ZM14.1131 5.25H9.5961V3.60743H14.1131C15.9274 3.60743 17.3983 5.07753 17.3983 6.89256V13.8324L19.0967 12.2473L20.2169 13.4464L16.577 16.8465L12.9371 13.4464L14.0573 12.2473L15.7557 13.8324V6.89256C15.7557 5.98915 15.0198 5.25 14.1131 5.25Z" />
            </g>
            <defs>
            <clipPath id="clip0_3_363">
            <rect x="0.562012" y="0.322327" width="19.7107" height="19.7107" fill="white"/>
            </clipPath>
            </defs>
          </svg>
          <span className="ml-1.5 text-sm">Repost</span>
        </button>
        
        <button className={`flex items-center rounded-md hover:bg-gray-100 ${iconTextColor} hover:bg-opacity-50`}>
          <svg width="16" height="16" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.1316 0.5L0.131592 7.7L7.33159 11.3L16.3316 5.3L9.73159 14.3L13.9316 21.5L21.1316 0.5Z" />
          </svg>
          <span className="ml-1.5 text-sm">Send</span>
        </button>
      </div>
    </div>
  );
};
