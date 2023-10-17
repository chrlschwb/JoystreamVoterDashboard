export interface TableHeaderColProps {
  value: string;
  key: number;
}

export default function TableHeaderCol({ value, key }: TableHeaderColProps) {
  return (
    <td className="p-1 text-gray-400">
      <div>{value}</div>
    </td>
  );
}
