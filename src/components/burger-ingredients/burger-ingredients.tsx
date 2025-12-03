import { FC, useState, useRef } from 'react';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  selectBuns,
  selectMains,
  selectSauces
} from '../../services/slices/ingredients-slice';

export const BurgerIngredients: FC = () => {
  const buns = useSelector(selectBuns);
  const mains = useSelector(selectMains);
  const sauces = useSelector(selectSauces);

  console.log('Buns:', buns);
  console.log('Mains:', mains);
  console.log('Sauces:', sauces);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const bunsRef = (node?: Element | null) => {};
  const mainsRef = (node?: Element | null) => {};
  const saucesRef = (node?: Element | null) => {};

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={handleTabClick}
    />
  );
};
