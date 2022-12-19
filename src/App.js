import './App.css';
import Footer from './components/Footer/Footer';
import NavigationMain from './components/Navbar/NavigationMain';

import MainRoute from './Routes/MainRoute';

function App() {
  return (
    <div className="App">
      <NavigationMain />
      <MainRoute/>
      <Footer/>
      
    </div>
  );
}

export default App;
