import React from 'react';

import { useThreadData } from '@/hooks';
import { useSelectedCouncil } from '@/store';
import { isDefined } from '@/types';
import Tooltip from './Tooltip';
import Spinner from './Spinner';
import Error from './Error';

export interface SubPannelProps {
  title: string;
  data: PanelProps[];
  loading?: any;
  error?: any;
}

export interface PanelProps {
  value?: number;
  tooltip: string;
  subtitle: string;
}
export default function SubPannel({ data, loading, error, title }: SubPannelProps) {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  const items = data.map((d: PanelProps) => {
    return (
      <Tooltip content={d.tooltip} position="top">
        <div className="text-center">
          <div className="border-b border-gray-800">{isDefined(d.value) ? (isNaN(d.value) ? '-' : d.value) : '-'}</div>
          <div className="mt-1">{d.subtitle}</div>
        </div>
      </Tooltip>
    );
  });

  return (
    <div className="rounded border-2 border-gray-400 bg-black shadow-md shadow-white">
      <div className="mb-2 mt-2 text-2xl font-bold text-gray-300 ">{title}</div>
      <hr className="border-gray-500" />
      <div
        className={`grid grid-flow-col grid-cols-${data.length} gap-${
          4 - data?.length
        } mb-2 mt-3 font-normal text-gray-400`}
      >
        {items}
      </div>
    </div>
  );
}
