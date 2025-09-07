import { cn } from '../lib/utils';

const DefaultAvatar = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      'bg-gray-200 text-gray-400 h-10 w-10 rounded-full flex justify-center items-center',
      className
    )}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="25" 
        height="25" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
  )
}

export default DefaultAvatar;
