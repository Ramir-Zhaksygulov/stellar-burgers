import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { useLocation } from 'react-router-dom';
import { OrderCardUI } from '../ui/order-card';
import { TIngredient, TOrder } from '@utils-types';

type OrderCardProps = {
  order: TOrder;
  maxIngredients: number;
};

export const OrderCard: FC<OrderCardProps> = ({ order, maxIngredients }) => {
  const location = useLocation();
  const ingredientsList: TIngredient[] = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    const ingredientsInfo = order.ingredients
      .map((id) => ingredientsList.find((ing) => ing._id === id))
      .filter((ing): ing is TIngredient => !!ing);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains = ingredientsInfo.length - ingredientsToShow.length;

    const total = ingredientsInfo.reduce((sum, ing) => sum + ing.price, 0);

    return {
      _id: order._id,
      status: order.status,
      name: order.name,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      number: order.number,
      ingredients: order.ingredients,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date: new Date(order.createdAt)
    };
  }, [order, ingredientsList, maxIngredients]);

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
};
