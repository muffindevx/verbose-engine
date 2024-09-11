import { PopupProvider, usePopups, Button } from '@monitoreo/popup-provider';

function App() {
  const { closeAll } = usePopups();

  function handleCloseAll() {
    closeAll();
  }

  return (
    <>
      <PopupProvider>
        <Button onClick={handleCloseAll}>Close all popups</Button>
      </PopupProvider>
    </>
  );
}

export default App;
