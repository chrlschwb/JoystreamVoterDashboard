import React from 'react';
import Moment from 'react-moment';

import { Block } from '@/types';

export interface BlockTimeProps {
  block: Block;
}

export default function BlockTime({ block }: BlockTimeProps) {
  return (
    <a
      href={`https://polkadot.js.org/apps/?rpc=${'wss://rpc.joystream.org:9944'}/ws-rpc#/explorer/query/${block.number
        }`}
    >
      {block.timestamp === "1970-01-01T00:00:00.000Z" ? "2022-12-17T00:00:00.000Z" : block.timestamp}
    </a>
  );
}
