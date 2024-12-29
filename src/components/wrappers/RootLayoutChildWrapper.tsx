import { useLoadApp, useMaintainApp, useCheckAppLoaded } from '@/hooks';

interface RootLayoutChildWrapperProps {
  children: React.ReactNode;
}

const RootLayoutChildWrapper: React.FC<RootLayoutChildWrapperProps> = ({ children }) => {
  useLoadApp();

  useMaintainApp();

  useCheckAppLoaded();

  return children
}

export default RootLayoutChildWrapper;