//define object types when table parsing is implemented
function TableHeader({ item }: any) {
  return (
    <tr>
      {Object.keys(item).map((key, index) => (
        <th
          scope="col"
          className={[
            'px-3',
            'whitespace-nowrap',
            'lowercase',
            'py-3.5',
            'text-left',
            'text-sm',
            'font-semibold',
            'first:py-3.5',
            'first:pl-4',
            'first:pr-3',
            'first:sm:pl-6',
            'first:lg:pl-8',
          ].join(' ')}
          key={index}
        >
          {key.replace(/([a-z])([A-Z])/g, `$1 $2`)}
        </th>
      ))}
    </tr>
  )
}

function TableRow({ rowData }: any) {
  return (
    <tr>
      {Object.keys(rowData).map((key, idx) => (
        <td
          className={[
            'whitespace-nowrap',
            'px-3',
            'py-4',
            'text-sm',
            'text-gray-500',
            'first:pl-4',
            'first:pr-3',
            'first:sm:pl-6',
            'first:lg:pl-8',
            'first:text-gray-900',
          ].join(' ')}
          key={idx}
        >
          {rowData[key as keyof typeof rowData]}
        </td>
      ))}
    </tr>
  )
}

export default function Table({ data }: any) {
  const { title, content } = data
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {title && (
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <TableHeader item={content[0]} />
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {content.map((rowItem: any, index: number) => (
                    <TableRow rowData={rowItem} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
