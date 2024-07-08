import { Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-white to-stone-800">

      <div className="flex flex-col">

        <div>
        <Text className="text-4xl font-bold p-5 m-3">
          A simple journalling app to declutter your mind. 
        </Text>
        </div>

        <div className="flex justify-center p-4 rounded">
          <Link to={'/login'}>
            <button className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded m-1 ">
              Login
            </button>
          </Link>
          <Link to={'/signup'}>
            <button className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded m-1">
              Signup
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}
