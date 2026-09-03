// // import { useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';

// // export function ScrollToTop() {
// //   const { pathname } = useLocation();

// //   useEffect(() => {
// //     // window.scrollTo(0, 0);
// //     window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
// //   }, [pathname]);

// //   return null;
// // }

// import { useEffect } from 'react';
// import { useLocation, useNavigationType } from 'react-router-dom';

// export function ScrollToTop() {
//   const { pathname } = useLocation();
//   const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'

//   useEffect(() => {
//     // POP = back/forward button -> browser ko khud scroll position restore karne do
//     if (navType === 'POP') return;

//     // PUSH/REPLACE = normal link click / naya navigation -> top pe le jao
//     window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
//   }, [pathname, navType]);

//   return null;
// }

import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// module-level, SPA session ke liye persist rahega
const scrollPositions = new Map<string, number>();

export function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP' | 'PUSH' | 'REPLACE'

  // is location ke liye scroll position continuously save karo
  useEffect(() => {
    const key = location.key;
    const onScroll = () => {
      scrollPositions.set(key, window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.key]);

  // navigation hone par scroll handle karo
  useEffect(() => {
    if (navType === 'POP') {
      const target = scrollPositions.get(location.key) ?? 0;
      let attempts = 0;
      const maxAttempts = 40; // ~2s tak retry

      const tryRestore = () => {
        attempts++;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const canReach = maxScroll >= target;

        if (canReach || attempts >= maxAttempts) {
          window.scrollTo({
            top: Math.min(target, maxScroll),
            left: 0,
            behavior: 'instant' as ScrollBehavior,
          });
        } else {
          setTimeout(tryRestore, 50); // content load hone tak retry
        }
      };
      tryRestore();
    } else {
      // PUSH/REPLACE — naya page, top pe le jao
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.key, navType]);

  return null;
}