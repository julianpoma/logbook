import { useEffect } from 'react';

export default function useCmdSSubmit(formRef, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        formRef.current?.requestSubmit();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [formRef, enabled]);
}
