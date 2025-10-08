import React, { useEffect, useState, useContext, useCallback } from "react"
import { FiEdit, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { AuthContext } from "../context/AuthContext"
import apiClient from "../api/apiClient"

const AdminDashboard = () => {
  const [services, setServices] = useState([])
  const [orders, setOrders] = useState([])
  const [searchUser, setSearchUser] = useState("")
  const [searchDate, setSearchDate] = useState("")
  const [newService, setNewService] = useState({ name: "", fee: "", plan: "" })
  const [editService, setEditService] = useState(null)
  const [expandedUsers, setExpandedUsers] = useState({})

  const { token, isAdmin } = useContext(AuthContext)

  const fetchServices = useCallback(async () => {
    try {
      const res = await apiClient.get("/services", { headers: { Authorization: `Bearer ${token}` } })
      setServices(res.data)
    } catch {
      alert("Failed to fetch services")
    }
  }, [token])

  const fetchOrders = useCallback(async () => {
    try {
      const res = await apiClient.get("/orders/all", { headers: { Authorization: `Bearer ${token}` } })
      setOrders(res.data)
      const expanded = res.data.reduce((acc, order) => {
        const key = order.user?.name || order.user?.email || "Unknown User"
        acc[key] = true
        return acc
      }, {})
      setExpandedUsers(expanded)
    } catch {
      alert("Failed to fetch orders")
    }
  }, [token])

  useEffect(() => {
    if (isAdmin) {
      fetchServices()
      fetchOrders()
    }
  }, [isAdmin, fetchServices, fetchOrders])

  const handleAddService = async e => {
    e.preventDefault()
    try {
      await apiClient.post("/services/add", newService, { headers: { Authorization: `Bearer ${token}` } })
      setNewService({ name: "", fee: "", plan: "" })
      fetchServices()
    } catch {
      alert("Failed to add service")
    }
  }

  const handleEditService = async e => {
    e.preventDefault()
    try {
      await apiClient.patch(`/services/update/${editService._id}`, editService, { headers: { Authorization: `Bearer ${token}` } })
      setEditService(null)
      fetchServices()
    } catch {
      alert("Failed to update service")
    }
  }

  const handleDeleteService = async id => {
    if (!window.confirm("Delete this service?")) return
    try {
      await apiClient.delete(`/services/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      fetchServices()
    } catch {
      alert("Failed to delete service")
    }
  }

  const filteredOrders = orders.filter(o => {
    const userMatch = searchUser ? (o.user?.name || o.user?.email) === searchUser : true
    const dateMatch = searchDate ? new Date(o.createdAt).toISOString().slice(0, 10) === searchDate : true
    return userMatch && dateMatch
  })

  const ordersByUser = filteredOrders.reduce((acc, order) => {
    const key = order.user?.name || order.user?.email || "Unknown User"
    if (!acc[key]) acc[key] = []
    acc[key].push(order)
    return acc
  }, {})

  if (!isAdmin) return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-3xl font-bold text-red-600">Access Denied! Admins only.</h2>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-10">
      <h2 className="text-4xl font-bold text-center text-blue-600 mt-12 mb-6">Admin Dashboard</h2>

      {/* Services Management */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold mb-4">{editService ? "Edit Service" : "Add New Service"}</h3>
        <form onSubmit={editService ? handleEditService : handleAddService} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Service Name" value={editService ? editService.name : newService.name} onChange={e => editService ? setEditService({ ...editService, name: e.target.value }) : setNewService({ ...newService, name: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="number" placeholder="Fee" value={editService ? editService.fee : newService.fee} onChange={e => editService ? setEditService({ ...editService, fee: e.target.value }) : setNewService({ ...newService, fee: e.target.value })} className="border px-3 py-2 rounded" required />
          <input type="text" placeholder="Plan" value={editService ? editService.plan : newService.plan} onChange={e => editService ? setEditService({ ...editService, plan: e.target.value }) : setNewService({ ...newService, plan: e.target.value })} className="border px-3 py-2 rounded" />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">{editService ? "Update" : "Add"}</button>
            {editService && <button type="button" onClick={() => setEditService(null)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>

      {/* List of Services */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s._id} className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg">{s.name}</h4>
                <p className="text-gray-700">Fee: ${s.fee}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded">{s.plan || "N/A"}</span>
              </div>
              <div className="flex gap-2 text-gray-700">
                <button onClick={() => setEditService(s)} className="hover:text-yellow-500"><FiEdit size={20} /></button>
                <button onClick={() => handleDeleteService(s._id)} className="hover:text-red-500"><FiTrash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">All Orders</h3>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select value={searchUser} onChange={e => setSearchUser(e.target.value)} className="border px-3 py-2 rounded">
            <option value="">All Users</option>
            {[...new Set(orders.map(o => o.user?.name || o.user?.email))].map((u, idx) => <option key={idx} value={u}>{u}</option>)}
          </select>
          <input type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} className="border px-3 py-2 rounded" />
        </div>

        {Object.keys(ordersByUser).length === 0 && <p className="text-gray-500">No orders found</p>}

        <div className="space-y-4">
          {Object.entries(ordersByUser).map(([user, userOrders]) => (
            <div key={user} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedUsers(prev => ({ ...prev, [user]: !prev[user] }))}>
                <h4 className="font-bold text-lg">{user}</h4>
                {expandedUsers[user] ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {expandedUsers[user] && (
                <div className="mt-2 flex flex-wrap gap-4">
                  {userOrders.map(o => (
                    <div key={o._id} className="bg-gray-50 p-4 rounded-xl shadow w-full sm:w-[48%] md:w-[30%]">
                      <p><span className="font-semibold">Total:</span> ${o.totalFee}</p>
                      <p><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-white text-sm ${o.status === "Pending" ? "bg-yellow-500" : o.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}>{o.status}</span></p>
                      <p><span className="font-semibold">Date:</span> {new Date(o.createdAt).toLocaleDateString()}</p>
                      <div className="mt-2 max-h-32 overflow-y-auto">
                        <h5 className="font-semibold">Items:</h5>
                        <ul className="list-disc list-inside">{o.items?.map((item, idx) => <li key={idx}>{item.service?.name} - ${item.service?.fee}</li>)}</ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
