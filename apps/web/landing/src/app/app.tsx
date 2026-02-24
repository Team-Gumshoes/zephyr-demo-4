import '../styles.css';
import { Hero } from '../components/Hero';
import { InputForm } from '../components/InputForm';
import { PageBackground } from '../components/PageBackground';

export function App() {
  return (
    <PageBackground>
      <div className="flex flex-col">
        <Hero
          title="Plan Trips Smart"
          subtitle="Use AI to craft your travel plans with ease"
        />
        <div className="px-8 md:mx-auto py-12">
          <InputForm />
        </div>
      </div>
    </PageBackground>
  );
}

export default App;
