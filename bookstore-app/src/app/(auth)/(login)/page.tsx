import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Login = () => {

  return (
    <>
    <main className='flex items-center justify-center min-h-screen '>
      <div className='p-8 rounded-md shadow-md w-full max-w-sm border-2 bg-slate-300'>
        <h2 className='text-2xl mb-6 flex justify-center'>Login</h2>

        <form>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='w-full p-2 border rounded-md'
              />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm font-medium mb-2'>
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='Enter your password'
              className='w-full p-2 border rounded-md'
              />
          </div>

          <Button type='submit' className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800'>
            Login
          </Button>
        </form>
      </div>
    </main>
    </>
  )
}

export default Login
