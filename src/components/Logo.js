import React from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import userImage from 'assets/img/logo/logo_200.png';

const Logo = ({
  rounded,
  circle,
  src,
  size,
  tag: Tag,
  className,
  style,
  ...restProps
}) => {
  const classes = classNames({ 'rounded-circle': circle, rounded }, className);
  return (
    <Tag
      src={src}
      style={{ ...style }}
      className={classes}
      {...restProps}
    />
  );
};

Logo.propTypes = {
  tag: PropTypes.component,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
};

Logo.defaultProps = {
  tag: 'img',
  rounded: false,
  circle: true,
  size: 40,
  src: userImage,
  style: {
      margin: '10% 30% 10% 30%',
      boxShadow: '-2px -1px #8888',
      width: '35%',
      height: '35%'
        },
};

export default Logo;
