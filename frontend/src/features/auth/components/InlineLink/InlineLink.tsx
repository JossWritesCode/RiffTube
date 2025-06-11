import React from 'react';

export type InlineLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function InlineLink({ className = '', ...props }: InlineLinkProps) {
  return (
    <a
      {...props}
      className={`text-sm text-yellow-400 hover:underline ${className}`.trim()}
    />
  );
}

export default InlineLink;
