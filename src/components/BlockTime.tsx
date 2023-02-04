import React from 'react';
import Moment from 'react-moment';

import { Block } from '@/types';

export interface BlockTimeProps {
  block: Block;
}

export default function BlockTime({ block }: BlockTimeProps) {
  return (
    <a
      href={`https://polkadot.js.org/apps/?rpc=${"wss://rpc.joystream.org:9944"}/ws-rpc#/explorer/query/${block.number
        }`}
    >
      {block.timestamp}
    </a >
  );
}
