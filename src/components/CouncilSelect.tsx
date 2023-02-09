import React from 'react';
import Select, { components, OptionProps, SingleValueProps, StylesConfig } from 'react-select';

import { useElectedCouncils } from '@/hooks';
import { ElectedCouncil } from '@/types';

import BlockTime from './BlockTime';

export interface CouncilSelectProps {
  council?: ElectedCouncil;
  onChange?: (concil: ElectedCouncil | undefined) => void;
}

const SingleValue = (singleValueProps: SingleValueProps<ElectedCouncil>) => {
  const {
    data: { id },
  } = singleValueProps;

  return <components.SingleValue {...singleValueProps}>{id}</components.SingleValue>;
};

const Option = (optionProps: OptionProps<ElectedCouncil>) => {
  const { data } = optionProps;
  return <components.Option {...optionProps}>{data.id}</components.Option>;
};

export default function CouncilSelect({ council, onChange }: CouncilSelectProps) {
  const { data } = useElectedCouncils({});

  return (
    <div>
      <div className="justify-content-center">
        <span style={{ fontSize: '30px', color: 'white' }}>COUNCIL PERIOD : &nbsp;</span>
        <Select
          id="council"
          className="select_input"
          // styles={styles}
          isMulti={false}
          options={data}
          value={council}
          onChange={(council) => onChange?.(council !== null ? council : undefined)}
          components={{ SingleValue, Option }}
        />
        {council && (
          <>
            <span className="time_label">
              Elected: <BlockTime block={council.electedAt} />
            </span>
            {council.endedAt && (
              <span className="time_label">
                Ended: <BlockTime block={council.endedAt} />
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
