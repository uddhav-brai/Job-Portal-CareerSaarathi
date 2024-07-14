// useNavigateWithParams.js
import { useNavigate } from 'react-router-dom';

const useNavigateWithParams = () => {
  const navigate = useNavigate();

  const navigateWithParams = (path, params) => {
    const urlSearchParams = new URLSearchParams(params);
    navigate(`${path}?${urlSearchParams.toString()}`);
  };

  return navigateWithParams;
};

export default useNavigateWithParams;
