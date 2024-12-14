import { useLoadApp } from '@/hooks';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
}

const RootLayoutChildWrapper: React.FC<RootLayoutChildWrapperProps> = ({ children }) => {
  useLoadApp();
  return children
}

export default RootLayoutChildWrapper;