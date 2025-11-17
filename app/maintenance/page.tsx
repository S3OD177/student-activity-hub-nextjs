import { Wrench } from "lucide-react"

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="text-center">
        <Wrench className="h-24 w-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold text-white mb-4">Under Maintenance</h1>
        <p className="text-xl text-gray-300 mb-8">
          We're currently performing scheduled maintenance.<br />
          We'll be back shortly!
        </p>
        <div className="inline-block px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold">
          Please check back soon
        </div>
      </div>
    </div>
  )
}
