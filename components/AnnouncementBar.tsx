

// import { useState, useEffect } from 'react';
// import Link from '@/components/RouterLink';
// import Image from '@/components/Image';
// import { api } from '@/lib/api';
// import { fallbackAnnouncement } from '@/lib/fallback-data';
// import type { AnnouncementBar as AnnouncementType } from '@/types';

// export function AnnouncementBar() {
//   const [bar, setBar] = useState<AnnouncementType | null>(null);

//   useEffect(() => {
//     api.getAnnouncementBar().then((data) => {
//       if (data && data.isActive) setBar(data);
//       else setBar(fallbackAnnouncement.isActive ? fallbackAnnouncement : null);
//     });
//   }, []);

//   if (!bar || !bar.isActive) return null;

//   return (
//     <div className="hidden border-b border-border bg-black md:block">
//       <div className="container-page flex items-center gap-6 py-2 text-sm">

//         {/* Marquee Text - Poora text hyperlinked hai */}
//         <div className="flex-1 overflow-hidden">
//           <marquee scrollamount="5">
//             {bar.link ? (
//               <Link 
//                 href={bar.link} 
//                 className="font-medium text-white hover:underline hover:text-gray-200"
//               >
//                 {bar.text}
//               </Link>
//             ) : (
//               <span className="font-medium text-white">{bar.text}</span>
//             )}
//           </marquee>
//         </div>

//         {/* Right side — Fixed Logo */}
//         <div className="flex shrink-0 items-center">
//           <div className="rounded-md shadow-sm">
//             <Image
//               src="/images/whitelogo.png"
//               alt="Logo"
//               width={70}
//               height={24}
//               className="h-6 w-auto"
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import Link from '@/components/RouterLink';
import Image from '@/components/Image';
import { api } from '@/lib/api';
import { fallbackAnnouncement } from '@/lib/fallback-data';
import type { AnnouncementBar as AnnouncementType } from '@/types';

export function AnnouncementBar() {
  const [bar, setBar] = useState<AnnouncementType | null>(null);
  const marqueeRef = useRef<HTMLMarqueeElement>(null);

  useEffect(() => {
    api.getAnnouncementBar().then((data) => {
      if (data && data.isActive) setBar(data);
      else setBar(fallbackAnnouncement.isActive ? fallbackAnnouncement : null);
    });
  }, []);

  if (!bar || !bar.isActive) return null;

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.stop(); // pause scrolling
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.start(); // resume scrolling
    }
  };

  return (
    <div className="hidden border-b border-border bg-black md:block">
      <div className="container-page flex items-center gap-6 py-2 text-sm">
        <div className="flex-1 overflow-hidden">
          <marquee
            ref={marqueeRef}
            scrollamount="5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {bar.link ? (
              <Link
                href={bar.link}
                className="font-medium text-white hover:underline hover:text-gray-200"
              >
                {bar.text}
              </Link>
            ) : (
              <span className="font-medium text-white">{bar.text}</span>
            )}
          </marquee>
        </div>

        <div className="flex shrink-0 items-center">
          <div className="rounded-md shadow-sm">
            <Image
              src="/images/whitelogo.png"
              alt="Logo"
              width={70}
              height={24}
              className="h-6 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}