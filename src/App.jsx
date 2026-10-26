import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="min-h-screen bg-opal-50 p-8">
      <h1 className="text-3xl font-bold text-opal-700">JobTrail</h1>
      <p className="mt-2 text-opal-900">Tailwind and shadcn are working.</p>
      <div className="mt-4 flex gap-3">
        <Button>shadcn button</Button>
        <Button variant="outline">Outline button</Button>
      </div>
    </div>
  )
}

export default App