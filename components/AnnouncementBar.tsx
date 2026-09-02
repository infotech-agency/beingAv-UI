
// import { useState, useEffect } from 'react';
// import Link from '@/components/RouterLink';
// import Image from '@/components/Image';
// import { api } from '@/lib/api';
// import { fallbackAnnouncement } from '@/lib/fallback-data';
// import type { AnnouncementBar as AnnouncementType } from '@/types';
// import { ChevronRight } from 'lucide-react';

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

//         {/* Marquee Text — single continuous scroll */}
//         <div className="flex-1 overflow-hidden whitespace-nowrap">
//           <div className="inline-block animate-[marquee_15s_linear_infinite]">
//             <span className="font-medium text-white">{bar.text}</span>
//           </div>
//         </div>

//         {/* Right side — Learn More button + Logo, fixed at end */}
//         <div className="flex shrink-0 items-center gap-4">
//           {bar.link && (
//             <Link
//               href={bar.link}
//               className="inline-flex items-center whitespace-nowrap font-semibold text-destructive hover:underline"
//             >
//               Learn more
//               <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
//             </Link>
//           )}
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

import { useState, useEffect } from 'react';
import Link from '@/components/RouterLink';
import Image from '@/components/Image';
import { api } from '@/lib/api';
import { fallbackAnnouncement } from '@/lib/fallback-data';
import type { AnnouncementBar as AnnouncementType } from '@/types';

export function AnnouncementBar() {
  const [bar, setBar] = useState<AnnouncementType | null>(null);

  useEffect(() => {
    api.getAnnouncementBar().then((data) => {
      if (data && data.isActive) setBar(data);
      else setBar(fallbackAnnouncement.isActive ? fallbackAnnouncement : null);
    });
  }, []);

  if (!bar || !bar.isActive) return null;

  return (
    <div className="hidden border-b border-border bg-black md:block">
      <div className="container-page flex items-center gap-6 py-2 text-sm">

        {/* Marquee Text - Poora text hyperlinked hai */}
        <div className="flex-1 overflow-hidden">
          <marquee scrollamount="5">
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

        {/* Right side — Fixed Logo */}
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