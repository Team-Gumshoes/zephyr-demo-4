import '../styles.css';
import { Hero } from '../components/Hero';
import { InputForm } from '../components/InputForm';
import { PageBackground } from '../components/PageBackground';

export function App() {
  return (
    <PageBackground>
      <div className="flex flex-col">
        <Hero title="AllorAI" subtitle="Your trip planning agent" />
        <div className="px-8 md:mx-auto py-12">
          <InputForm />
        </div>
      </div>
    </PageBackground>
  );
}

export default App;
