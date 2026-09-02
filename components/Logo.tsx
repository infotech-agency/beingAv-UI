// import Image from '@/components/Image';
// import Link from '@/components/RouterLink';

// export function Logo({ className = '' }: { className?: string }) {
//   return (
//     <Link href="/" className={`flex items-center gap-2 ${className}`}>
      
//       <span className="text-xl font-bold tracking-tight text-foreground">
//   <Image
//     src="/images/logo.png"
//     height={180}
//     width={180}
//     alt="logo"
//   />
// </span>
//     </Link>
//   );
// }

import Image from '@/components/Image';
import Link from '@/components/RouterLink';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

export function Logo({ className = '', variant = 'default' }: LogoProps) {
  const src = variant === 'white' ? '/images/whitelogo.png' : '/images/logo.png';

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="text-xl font-bold tracking-tight text-foreground">
        <Image
          src={src}
          height={180}
          width={180}
          alt="logo"
        />
      </span>
    </Link>
  );
}