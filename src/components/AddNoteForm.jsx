import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function AddNoteForm({ onAddNote }) {
  const [text, setText] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() === "") {
      return
    }
    onAddNote(text.trim())
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <Label htmlFor="note">Add a note</Label>
      <Textarea
        id="note"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="For example: phone call with the recruiter, answer expected next week"
      />
      <div>
        <Button type="submit" size="sm">
          Save note
        </Button>
      </div>
    </form>
  )
}

export default AddNoteForm