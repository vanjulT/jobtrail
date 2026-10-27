function formatNoteDate(isoString) {
  return new Date(isoString).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function NotesTimeline({ notes }) {
  if (notes.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No notes yet. Write your first note above.
      </p>
    )
  }

  return (
    <ol className="grid gap-4 border-l-2 border-opal-200 pl-4">
      {notes.map((note) => (
        <li key={note.id} className="relative">
          <span className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full bg-opal-500" />
          <time className="text-xs text-slate-500" dateTime={note.date}>
            {formatNoteDate(note.date)}
          </time>
          <p className="mt-0.5 whitespace-pre-wrap text-slate-800">{note.text}</p>
        </li>
      ))}
    </ol>
  )
}

export default NotesTimeline