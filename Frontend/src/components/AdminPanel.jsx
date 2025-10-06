import React, { useEffect, useState } from "react"

const AdminPanel = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/services", {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) {
        setServices(data)
      } else {
        setError(data.msg || "Failed to fetch services")
      }
    } catch {
      setError("Error fetching services")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    const confirmed = window.confirm("Are you sure you want to delete this service?")
    if (!confirmed) return

    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:5000/api/services/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) {
        setServices(services.filter(s => s._id !== id))
      } else {
        alert(data.msg || "Delete failed")
      }
    } catch {
      alert("Error deleting service")
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Fee</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{service.name}</td>
              <td className="border px-4 py-2">{service.category}</td>
              <td className="border px-4 py-2">{service.fee}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPanel