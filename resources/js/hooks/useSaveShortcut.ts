import { useEffect } from 'react';

type Args = {
  onSave: () => void;
  enabled?: boolean;
};

export function useSaveShortcut({ onSave, enabled = true }: Args) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        onSave();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave, enabled]);
}
