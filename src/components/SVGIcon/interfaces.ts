import { CSSProperties } from 'react';
import { IconMap } from './helper';

export type IconNameType = keyof typeof IconMap;

export type TagType = keyof JSX.IntrinsicElements;

export interface IIconProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  fill?: string;
  stroke?: string;
  src?: string;
  transform?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
}

export interface ISVGIconProps extends IIconProps {
  iconName: IconNameType;
  className?: string;
  useDiv?: boolean;
  style?: CSSProperties;
}
