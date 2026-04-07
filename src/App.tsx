import { BrowserRouter } from 'react-router-dom';
import ThemeCustomization from './theme/ThemeCustomization';
import ThemeRoutes from './routes';
import './App.css'; // Retaining basic styles if needed

function App() {
  return (
    <ThemeCustomization>
      <BrowserRouter>
        <ThemeRoutes />
      </BrowserRouter>
    </ThemeCustomization>
  );
}

export default App;
