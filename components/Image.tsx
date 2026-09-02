// import type { ImgHTMLAttributes } from 'react';

// type Props = ImgHTMLAttributes<HTMLImageElement> & {
//   fill?: boolean;
//   priority?: boolean;
//   width?: number;
//   height?: number;
// };

// export default function Image({ fill, priority, style, ...props }: Props) {
//   return <img {...props} loading={priority ? 'eager' : props.loading} style={fill ? { width: '100%', height: '100%', objectFit: 'cover', ...style } : style} />;
// }

import type { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  objectFit?: React.CSSProperties['objectFit'];
};

export default function Image({ fill, priority, style, objectFit = 'cover', ...props }: Props) {
  return (
    <img
      {...props}
      loading={priority ? 'eager' : props.loading}
      style={
        fill
          ? { width: '100%', height: '100%', objectFit, ...style }
          : style
      }
    />
  );
}