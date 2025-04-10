import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { TextInputTooltip } from '../components/Test/TextInputTooltip';
import { ProgressBar } from '../components/Test/ProgressBar';


export function HomePage() {
  return (
    <>
      <div style={{ margin: '5em' }}>
        <Welcome />
        <ColorSchemeToggle />
        <ProgressBar />
        <TextInputTooltip />
      </div>
    </>
  );
}
