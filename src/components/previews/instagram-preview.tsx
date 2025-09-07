import { type InstagramFormValues } from "../../lib/form-schema";
import { cn, formatNumberShort, truncateText } from "../../lib/utils";
import { formatInstagramDate, formatText } from "../../lib/format-text";
import { theme } from "../../type";
import { platformDimensions, SocialComponentProps } from "../..//config/platform";
import DefaultAvatar from "../defaultAvatar";

const defaultValues = {
  username: "username",
  fullName: "Full Name",
  caption: "This is a caption with #hashtags.",
  likeCount: 1234,
  commentCount: 56,
  location: "San Francisco, California",
  timestamp: new Date().toISOString(),
  verified: true,
  profilePicture: undefined,
  postImages: undefined,
};

export function InstagramPreview({ theme = 'light', values }: SocialComponentProps<InstagramFormValues>) {

  const {
    profilePicture,
    username,
    postImages,
    caption,
    location,
    likeCount,
    commentCount,
    timestamp,
    verified,
  } = values || defaultValues;
  
  const { mobileWidth } = platformDimensions['instagram'];

  // Format timestamp using our Instagram-style formatter
  const getFormattedDate = (timestamp?: string) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return formatInstagramDate(date);
  };

  const formattedCaption = formatText(
    truncateText(caption ?? '', 125),
    {
      color: theme === 'light' ? '#5865f5' : '#8590f4',
    }
  )

  return (
    <div
      style={{ ['--mobile-width' as string]: `${mobileWidth}px` }} 
      className={cn(
      'w-full flex flex-col bg-black text-white',
      "sm:w-[var(--mobile-width)]",
      {
        'bg-white text-black': theme === 'light'
      }
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {!profilePicture ? (
            <DefaultAvatar className="w-8 h-8 rounded-full overflow-hidden relative" />
          ) : (
            <div className="w-8 h-8 rounded-full overflow-hidden relative">
              <img
                src={profilePicture}
                alt="Profile picture"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">{username}</p>
              {verified && (
                <img 
                  src='/instagram-verified-badge.png'
                  width={16}
                  height={16}
                  alt="instagram-verified-badge"
                  className="w-4 h-4"
                />
              )}
            </div>
            {location && <p className="text-[11px]">{location}</p>}
          </div>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="11.5" r="1.5" fill="currentColor"/>
          <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor"/>
        </svg>
      </div>

      {/* Post Image */}
      {postImages && postImages.length > 0 && ( 
        <div className="relative w-full aspect-square">
          <img
            src={postImages[0]}
            alt="Post image"
            width={390}
            height={390}
            className="object-cover w-[390px] h-[390px]"
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-1 pb-5">
        {postImages && postImages.length > 1 && (
          <div className="my-2 flex justify-center items-center gap-[6px]">
              {postImages.slice(0, 5).map((_: any, index: number) => {
                const theme: theme = 'light';
                return <div key={index} className={cn(
                  "h-[7px] w-[7px] rounded-full",
                  theme === 'light' && 'bg-[#dcdfe4]',
                  theme === 'light' && index == 0 && 'bg-[#5865f5]',
                  index === 3 && 'h-[6px] w-[6px]',
                  index > 3 && 'h-1 w-1'
                  // theme === 'dark' && index == 0 && 'bg-[#8590f4]'
                )} />
              })}
          </div>
        )}
        <div className="flex items-center justify-between text-2xl py-2">
          <div className="flex items-center gap-3">
            {/* likes */}
            <svg width="24" height="24" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.0019 2.42621C14.8648 0.732386 17.2779 0.458896 19.0996 1.55414C21.0143 2.7062 22.0205 5.17193 21.4326 7.53851V7.53949C20.8746 9.78716 19.5094 11.6023 17.8505 13.3969C15.8957 15.5117 13.6308 17.2971 11.2539 19.0278C8.20069 16.7952 5.32524 14.5202 3.12104 11.5795L2.6767 10.9643L2.30463 10.4067C1.47636 9.10204 0.93046 7.76797 0.901314 6.28754C0.858679 4.12549 2.04165 2.18746 3.7646 1.35687L3.93256 1.27972C5.74188 0.498511 8.00082 0.953312 9.64155 2.56097C9.96332 2.87645 10.2943 3.19448 10.664 3.55316L11.3144 4.18304L11.9404 3.52972C12.256 3.20046 12.4911 2.92996 12.7421 2.67621L13.0019 2.42621Z" stroke="currentColor" strokeWidth="1.8"/>
            </svg>


            {/* comments */}
            <div className="flex items-center gap-1 -mr-1">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-inside-1_1903_80" fill="white">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4517 16.6305C21.435 14.9834 22 13.0577 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C13.062 22 14.9915 21.4326 16.6409 20.4455L21.8478 21.8407L20.4517 16.6305Z"/>
                </mask>
                <path d="M20.4517 16.6305L18.9062 15.7078C18.6568 16.1255 18.5871 16.6264 18.7131 17.0963L20.4517 16.6305ZM16.6409 20.4455L17.1068 18.7068C16.6362 18.5807 16.1346 18.6508 15.7165 18.901L16.6409 20.4455ZM21.8478 21.8407L21.3819 23.5793C22.0031 23.7458 22.6659 23.5682 23.1206 23.1135C23.5753 22.6587 23.7529 21.996 23.5865 21.3748L21.8478 21.8407ZM20.2 11C20.2 12.7239 19.7276 14.3319 18.9062 15.7078L21.9973 17.5531C23.1425 15.6348 23.8 13.3915 23.8 11H20.2ZM11 1.8C16.081 1.8 20.2 5.91898 20.2 11H23.8C23.8 3.93076 18.0692 -1.8 11 -1.8V1.8ZM1.8 11C1.8 5.91898 5.91898 1.8 11 1.8V-1.8C3.93076 -1.8 -1.8 3.93076 -1.8 11H1.8ZM11 20.2C5.91898 20.2 1.8 16.081 1.8 11H-1.8C-1.8 18.0692 3.93076 23.8 11 23.8V20.2ZM15.7165 18.901C14.3387 19.7256 12.7275 20.2 11 20.2V23.8C13.3965 23.8 15.6443 23.1397 17.5653 21.99L15.7165 18.901ZM16.175 22.1842L21.3819 23.5793L22.3137 20.102L17.1068 18.7068L16.175 22.1842ZM23.5865 21.3748L22.1904 16.1646L18.7131 17.0963L20.1091 22.3065L23.5865 21.3748Z" fill="currentColor" mask="url(#path-1-inside-1_1903_80)"/>
              </svg>

              <span className="text-sm font-medium">{formatNumberShort(commentCount ?? 0)}</span>
            </div>

            {/* share */}
            <svg aria-label="Share" fill="currentColor" height="23" role="img" viewBox="0 0 24 24" width="24">
              <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" x1="22" x2="9.218" y1="3" y2="10.083"></line>
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8"></polygon>
            </svg>
          </div>
          {/* save icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0996 1.90039V21.0781L12.5762 14.8086C12.2424 14.5305 11.7576 14.5305 11.4238 14.8086L3.90039 21.0781V1.90039H20.0996Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Likes */}
        <p className="font-bold text-sm mt-[2px]">{(likeCount || 0).toLocaleString()} likes</p>

        {/* Caption */}
        {caption && (
          <p className="text-sm mt-1">
            <span className="font-bold mr-1">{username}</span> 
            <span 
              dangerouslySetInnerHTML={{ __html: formattedCaption }}
            />
          </p>
        )}

        {/* Comments */}
        {/* {commentCount > 0 && (
          <p className="text-gray-500 text-xs mt-1">
            View all {commentCount} comments
          </p>
        )} */}

        {/* Timestamp */}
        <p className="text-[#6E6E6E] text-xs mt-[6px]">{getFormattedDate(timestamp)}</p>
      </div>
    </div>
  );
}
