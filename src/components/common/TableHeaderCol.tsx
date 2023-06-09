
export interface TableHeaderColProps {
    value: string,
}

export default function TableHeaderCol({ value, }: TableHeaderColProps) {
    return (
        <td className='p-1 text-gray-400'>
            <div>{value}</div>
        </td>
    )

}
