import ProgressBar from './ProgressBar';
import { CardHeader, ContainerCardProgress } from './styles';

type CardProgressProps = {
  qtdForm: number;
  text: string;
  color: string;
};

export const Kpr: React.FC<CardProgressProps> = ({ qtdForm, text, color }) => (
  <ContainerCardProgress color={color}>
    <CardHeader>
      <span>{qtdForm}</span>
      <p>{text}</p>
    </CardHeader>

    <ProgressBar color={color} />
  </ContainerCardProgress>
);
