import { Routes, Route } from 'react-router-dom'
import LoginForm from './LoginForm'
import CreateAccountForm from './CreateAccountForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import ChangePasswordForm from './ChangePasswordForm'
import LoggedIn from './LoggedIn'
import NewAccountCreated from './NewAcountCreated'

const Form = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/register' element={<CreateAccountForm />} />
      <Route path='/forgot' element={<ForgotPasswordForm />} />
      <Route path='/change-password' element={<ChangePasswordForm />} />
      <Route path='/logged-in' element={<LoggedIn />} />
      <Route path='/new-account-created' element={<NewAccountCreated />} />
    </Routes>
  )
}

export default Form
