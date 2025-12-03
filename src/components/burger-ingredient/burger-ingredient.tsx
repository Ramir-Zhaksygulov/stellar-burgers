import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { BurgerIngredientUI } from '@ui';
import { addIngredient } from '../../services/slices/constructor-slice';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      if (!ingredient) return;
      const ingredientWithId = { ...ingredient, id: nanoid() };
      dispatch(addIngredient(ingredientWithId));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        handleAdd={handleAdd}
        locationState={{ background: location }}
      />
    );
  }
);
