import { Link as ReactRouterLink, type LinkProps } from 'react-router-dom';

type Props = Omit<LinkProps, 'to'> & { href: string };

export default function Link({ href, ...props }: Props) {
  return <ReactRouterLink to={href} {...props} />;
}
