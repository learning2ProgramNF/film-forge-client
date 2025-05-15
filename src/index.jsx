import { createRoot } from 'react-dom/client';

//Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

//Main componet (will eventually use all the others)
const FilmForgeApplication = () => {
  return (
    <div className="my-flix">
      <div>Good Morning</div>
    </div>
  );
};

//Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

//Tells React to render your app in the root of the DOM element
root.render(<FilmForgeApplication />);