interface FormatTextConfig {
  color: string;
  fontWeight?: string;
}

export function formatText(text: string, config: FormatTextConfig) {
  if (!text) return '';
  if (!config || !config.color) {
    throw new Error('All config properties are required');
  }

  const urlRegex = /(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?/g;
  const hashtagRegex = /#(\w+)/g;
  const mentionRegex = /@(\w+)/g;

  let formatted = text;
  formatted = formatted.replace(/\n/g, "<br>");

  formatted = formatted.replace(hashtagRegex, (match, tag) =>
    `<span style="color: ${config.color}; font-weight: ${config.fontWeight};">#${tag}</span>`
  );
  formatted = formatted.replace(mentionRegex, (match, mention) =>
    `<span style="color: ${config.color}; font-weight: ${config.fontWeight};">@${mention}</span>`
  );
  formatted = formatted.replace(urlRegex, (url) =>
    `<span style="color: ${config.color}; font-weight: ${config.fontWeight};">${url}</span>`
  );
  return formatted;
}


export function formatDate(date?: Date): string {
  if (!date) return '';
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }
  
  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }
  
  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }
  
  // Less than 7 days
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d`;
  }
  
  // Less than a month
  if (diffInDays < 30) {
    return `${diffInDays}d`;
  }

  // This year
  const thisYear = now.getFullYear();
  const dateYear = date.getFullYear();
  if (thisYear === dateYear) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  // Different year
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatInstagramDate(date?: Date): string {
  if (!date) return '';
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (diffInMinutes === 1) return "1 minute ago";
    return `${diffInMinutes} minutes ago`;
  }

  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (diffInHours === 1) return "1 hour ago";
    return `${diffInHours} hours ago`;
  }
  
  // Less than a week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  }
  
  // Less than a month (4 weeks)
  if (diffInDays < 28) {
    const weeks = Math.floor(diffInDays / 7);
    if (weeks === 1) return "1 week ago";
    return `${weeks} weeks ago`;
  }
  
  // Less than a year
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    if (diffInMonths === 1) return "1 month ago";
    return `${diffInMonths} months ago`;
  }
  
  // More than a year
  const diffInYears = Math.floor(diffInMonths / 12);
  if (diffInYears === 1) return "1 year ago";
  return `${diffInYears} years ago`;
}

export function formatFacebookDate(timestamp: Date): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return "Just now";
  }
  
  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (diffInMinutes === 1) return "1 min";
    return `${diffInMinutes} mins`;
  }
  
  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (diffInHours === 1) return "1 hr";
    return `${diffInHours} hrs`;
  }
  
  // Yesterday
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return "Yesterday at " + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  
  // Less than a week
  if (diffInDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' }) + " at " + 
           date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  
  // This year
  const thisYear = now.getFullYear();
  const dateYear = date.getFullYear();
  if (thisYear === dateYear) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + " at " + 
           date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  
  // Different year
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " at " + 
         date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}
