import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [checked1, setChecked1] = useState<boolean>(false)

  return (
    <Card>
      <div className="text-center mb-5">
        <div className="text-3xl mb-3">Login</div>
        <span className="line-height-3">Don't have an account?</span>
        <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
      </div>

      <div>
        <label htmlFor="email" className="block text-900 font-medium mb-2">
          Email
        </label>
        <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

        <label htmlFor="password" className="block text-900 font-medium mb-2">
          Password
        </label>
        <InputText type="password" placeholder="Password" className="w-full mb-3" />

        <div className="flex align-items-center justify-content-between mb-6">
          <div className="flex align-items-center">
            <Checkbox
              id="rememberme"
              className="mr-2"
              checked={checked1}
              onChange={(e) => setChecked1(e.checked)}
            />
            <label htmlFor="rememberme">Remember me</label>
          </div>
          <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
            Forgot your password?
          </a>
        </div>

        <Button label="Sign In" icon="pi pi-user" className="w-full" />
      </div>
    </Card>
  )
}

export default App
