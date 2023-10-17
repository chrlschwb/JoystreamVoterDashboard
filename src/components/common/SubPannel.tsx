import { Tooltip } from 'react-tooltip'
import { isDefined } from '@/types';
import Spinner from './Spinner';

import './style.css'
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
  const items = data.map((d: PanelProps, i) => {
    return (<div key={i}>

      <Tooltip id={d.tooltip} place={'top'} className='tooltip'>
        {d.tooltip}
      </Tooltip>
      <div className="text-center" data-tooltip-id={d.tooltip}>
        <div className="border-b border-gray-800">{isDefined(d.value) ? (isNaN(d.value) ? '-' : d.value) : '-'}</div>
        <div className="mt-1">{d.subtitle}</div>
      </div>
    </div>
    );
  });

  return (
    <div className="rounded border-2 border-gray-400 bg-black shadow-md shadow-white">
      <div className="pb-2 pt-2 text-2xl font-bold text-gray-300 bg-gray-700 rounded-t-sm ">{title}</div>
      <hr className="border-gray-500" />
      {loading || error ? <Spinner /> : <div
        className={`grid grid-flow-col grid-cols-${data.length} gap-${4 - data?.length
          } mb-2 mt-3 font-normal text-gray-400`}
      >
        {items}
      </div>}
    </div>
  );
}
