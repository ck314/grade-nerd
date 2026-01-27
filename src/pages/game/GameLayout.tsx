import { Outlet } from 'react-router-dom';
import { GameProgressProvider } from '../../hooks/useGameProgress';

export function GameLayout() {
  return (
    <GameProgressProvider>
      <Outlet />
    </GameProgressProvider>
  );
}
