import { ReactNode, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaPlus, FaBook, FaSignOutAlt } from 'react-icons/fa';

import { Container, Title, Content, Overlay, DropdownItems } from './styles';
import { useAuth } from 'hooks/auth';

type DropdownProps = {
  children: ReactNode;
};

const Dropdown = ({ children }: DropdownProps) => {
  const { push } = useRouter();
  const { signOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = useCallback(() => {
    setIsOpen(false);
    signOut();
  }, [signOut]);

  const handleRedirectToMyRecipes = useCallback(() => {
    setIsOpen(false);
    push('/my_recipes');
  }, [push]);

  const handleRedirectToNewRecipe = useCallback(() => {
    setIsOpen(false);
    push('/new');
  }, [push]);

  const handleRedirectToProfile = useCallback(() => {
    setIsOpen(false);
    push('/profile');
  }, [push]);

  return (
    <Container isOpen={isOpen}>
      <Title onClick={() => setIsOpen(!isOpen)}>{children}</Title>
      <Content aria-hidden={!isOpen}>
        <DropdownItems>
          <div onClick={handleRedirectToProfile}>
            <FaUser />
            <p>Meu perfil</p>
          </div>
          <div onClick={handleRedirectToMyRecipes}>
            <FaBook />
            <p>Minhas Receitas</p>
          </div>
          <div onClick={handleRedirectToNewRecipe}>
            <FaPlus />
            <p>Nova receita</p>
          </div>
          <div onClick={handleLogout}>
            <FaSignOutAlt />
            <p>Sair</p>
          </div>
        </DropdownItems>
      </Content>
      <Overlay aria-hidden={!isOpen} onClick={() => setIsOpen(!isOpen)} />
    </Container>
  );
};

export default Dropdown;
