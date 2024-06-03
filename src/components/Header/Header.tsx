import { FC, memo } from 'react';
import './Header.css';

const Header: FC = memo(() => {
  return <span className="header-text">Список счётчиков</span>;
});

export default Header;
