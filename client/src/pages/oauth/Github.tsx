import { useLocation, Navigate } from "react-router-dom"
import { onGithub } from "api/auth"
import useAuth from "stores/useAuth"

const Github = () => {
  const location = useLocation()
  const { login } = useAuth()
  const code = new URLSearchParams(location.search).get("code")
  if (code) {
    onGithub({ code }).then((res) => {
      login(res.access_token, res.refresh_token)
    })
    return <Navigate to="/marketplace" replace/>
  }

  return <Navigate to="/auth/login" replace/>
}

export default Github