import { useSearchParams } from 'react-router-dom'
import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
export default function Auth() {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type')

  if (type==='login') {
    return <LoginPage/>
  } else return <SignUpPage/>
}
