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

  // const styles: StylesConfig<ElectedCouncil, false> = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     background: state.isSelected ? 'red' : 'transpared',
  //     fontFamily: 'Inter',
  //     cursor: 'pointer',
  //   }),
  //   input: (base) => ({
  //     ...base,
  //   }),

  //   indicatorSeparator: () => ({ display: 'none' }),
  //   dropdownIndicator: (provided, state) => ({
  //     ...provided,

  //     transition: '0.5s',
  //     transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     background: 'transparent',
  //   }),
  //   menuList: (provided) => ({
  //     ...provided,

  //     borderRadius: '7px',
  //   }),
  //   valueContainer: (base) => ({
  //     ...base,
  //     fontFamily: 'Inter',
  //     minWidth: '100px',
  //   }),
  // };

  return (
    <form>
      <div className="flex flex-row items-center gap-2">
        <label htmlFor="council">Councils</label>
        <Select
          id="council"
          // styles={styles}
          isMulti={false}
          options={data}
          value={council}
          onChange={(council) => onChange?.(council !== null ? council : undefined)}
          components={{ SingleValue, Option }}
        />
      </div>
      {council && (
        <div className="flex flex-col gap-1">
          <h4>Council Id: {council.id}</h4>
          <p>
            Elected: <BlockTime block={council.electedAt} />
          </p>
          {council.endedAt && (
            <p>
              Ended: <BlockTime block={council.endedAt} />
            </p>
          )}
        </div>
      )}
    </form>
  );
}
