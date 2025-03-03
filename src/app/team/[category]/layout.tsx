import { Metadata } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'TECHTRIX 2K25 | Team',
  description: 'TECHTRIX 2K25 Organizing Team Description',
};

const TeamCategoryLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default TeamCategoryLayout;
