import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, updateProfile } from "./services/profileServices"

export const EditProfile = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getProfile().then(data => {
      setForm(f => ({
        ...f,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      }))
      setIsLoading(false)
    })
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSave = () => {
    setPasswordError("")

    if (form.password && form.password !== form.confirmPassword) {
      setPasswordError("Passwords do not match.")
      return
    }

    const payload = {
      username: form.username,
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
    }
    if (form.password) {
      payload.password = form.password
    }

    updateProfile(payload).then(() => {
      navigate("/profile")
    })
  }

  if (isLoading) {
    return (
      <section className="pt-20 px-6">
        <p className="text-gray-600">Loading...</p>
      </section>
    )
  }

  return (
    <section className="pt-20 px-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/profile")}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          ← Back to Profile
        </button>
        <h1 className="text-2xl font-bold mt-2">Edit Profile</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            New Password <span className="text-gray-500 font-normal">(leave blank to keep current)</span>
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {passwordError && (
          <p className="text-red-600 text-sm">{passwordError}</p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => navigate("/profile")}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md"
          >
            Save Profile
          </button>
        </div>
      </div>
    </section>
  )
}
