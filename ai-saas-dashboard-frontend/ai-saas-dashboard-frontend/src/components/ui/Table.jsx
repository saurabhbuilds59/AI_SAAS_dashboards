import { useMemo, useState } from 'react'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * columns: [{ key, header, sortable, render?(row) }]
 * data: array of row objects
 * pageSize: rows per page (client-side pagination; swap for server pagination
 *   by passing already-paged `data` and controlling `page`/`onPageChange`)
 */
export default function Table({ columns, data, pageSize = 8, emptyMessage = 'Nothing here yet.' }) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    if (!sortKey) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av === bv) return 0
      const result = av > bv ? 1 : -1
      return sortDir === 'asc' ? result : -result
    })
    return copy
  }, [data, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize)

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-black/5 dark:border-ink-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 dark:border-ink-line bg-black/[0.02] dark:bg-white/[0.02] text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium text-foam-muted">
                  {col.sortable ? (
                    <button onClick={() => toggleSort(col.key)} className="inline-flex items-center gap-1 hover:text-ink dark:hover:text-foam">
                      {col.header}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-foam-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={row.id ?? i} className="border-b border-black/5 dark:border-ink-line last:border-0 hover:bg-black/[0.015] dark:hover:bg-white/[0.02]">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-foam-muted">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-ghost !px-2 !py-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-ghost !px-2 !py-1"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
