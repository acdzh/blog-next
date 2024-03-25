'use client';
import { Link } from './index';

export const LinkGallery = () => {
  return (
    <>
      <Link href="#">default link</Link>
      &nbsp;&nbsp;
      <Link appearance="subtle" href="#">
        subtle link
      </Link>
      &nbsp;&nbsp;
      <div className="w-200">
        The following link renders as a span.{' '}
        <Link href="#">
          Links that render as a span wrap correctly between lines when their content is very long
        </Link>
        . This is because they behave as regular inline elements.
      </div>
    </>
  );
};
