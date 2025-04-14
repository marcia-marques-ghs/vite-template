import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { FormComponent } from '../components/Test/TextInputTooltip';
import { ProgressBar } from '../components/Test/ProgressBar';
import Subforms from '@/components/Test/Subforms';


export function HomePage() {
  return (
    <>
      <div>
        <ProgressBar />
        <Welcome />
        <ColorSchemeToggle />
        <FormComponent />
        <Subforms />
      </div>
    </>
  );
}
