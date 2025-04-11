import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { FormComponent } from '../components/Test/TextInputTooltip';
import { ProgressBar } from '../components/Test/ProgressBar';


export function HomePage() {
  return (
    <>
      <div>
        <ProgressBar />
        <Welcome />
        <ColorSchemeToggle />
        <FormComponent />
      </div>
    </>
  );
}
