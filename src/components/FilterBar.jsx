import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STATUSES } from "@/lib/constants"

const selectClass =
  "h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"

function FilterBar({
  searchText,
  onSearchTextChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="grid gap-1">
        <Label htmlFor="search">Search company</Label>
        <Input
          id="search"
          type="search"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Type a company name"
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="statusFilter">Status</Label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
          className={selectClass}
        >
          <option value="All">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <Label htmlFor="sortOrder">Sort by date applied</Label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
          className={selectClass}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar