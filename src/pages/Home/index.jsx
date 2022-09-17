import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../../Components/sectionHome/index';
import useGlobalContextProvider from '../../hooks/useGlobalContextProvider';
import './styles.css';


function Home() {

  const { token } = useGlobalContextProvider();
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);


  return (
    <div className='home-container' >
      < HomePage />
    </div>
  );

}
export default Home