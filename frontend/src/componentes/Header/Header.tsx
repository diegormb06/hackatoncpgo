import { UserData } from '../UserNameAndRole/UserNameAndRole';
import { ContainerHeader, TitlePerfil } from './styles';

export const Header = () => {
  return (
    <ContainerHeader>
      <TitlePerfil>Escola Estadual Emília Meireles</TitlePerfil>
      <UserData name={'João Ignácio da Silva'} userRole={'Diretor'} />
    </ContainerHeader>
  );
};
