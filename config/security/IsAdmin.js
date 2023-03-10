import { SessionProvider, useSession } from "next-auth/react";

export default function IsAdmin({children}) {
  const {data} = useSession()

  if (!data?.isAdmin) {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center mt-5">
          <div>You can't acces this page because you are not admin.</div>
      </div>
    )
  }

  return children
}