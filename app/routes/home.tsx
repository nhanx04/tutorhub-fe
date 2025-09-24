import { redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'

export const loader = async ({}: LoaderFunctionArgs) => {
  return redirect('/login')
}

export default function Home() {
  return null
}
