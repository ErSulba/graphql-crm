import React from 'react';

const Heading = ({ size = 'h1', className, children }) => {
  const classNames = className ? className : '';
  if (size === 'h1') return <h1 className={`text-center mb-5 ${classNames}`}>{children}</h1>;
  if (size === 'h2') return <h2 className={`text-center mb-5 ${classNames}`}>{children}</h2>;
  if (size === 'h3') return <h3 className={`text-center mb-5 ${classNames}`}>{children}</h3>;
  if (size === 'h4') return <h4 className={`text-center mb-5 ${classNames}`}>{children}</h4>;
  if (size === 'h5') return <h5 className={`text-center mb-5 ${classNames}`}>{children}</h5>;
};

export default Heading;
