import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearOrder,
  newOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/order-slice';
import { selectisAuthenticated } from '../../services/slices/user-slice';
import {
  clearConstructor,
  selectBun,
  selectConstructorIngredients
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuth = useSelector(selectisAuthenticated);

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (acc, item) => acc + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const constructorItems = {
    bun,
    ingredients,
    price
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuth) {
      return navigate('/login');
    }

    const ingredientIds = [bun._id, ...ingredients.map((i) => i._id), bun._id];

    dispatch(newOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      orderRequest={orderRequest}
      orderModalData={orderModalData}
      price={price}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
