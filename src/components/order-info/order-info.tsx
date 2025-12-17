import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderDetails,
  selectOrderDetails
} from '../../services/slices/orders-slice';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { TIngredient } from '@utils-types';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  const orderData = useSelector(selectOrderDetails);
  const allIngredients = useSelector(selectIngredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderDetails(Number(number)));
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !allIngredients.length) return null;

    const ingredientsMap: Record<string, TIngredient & { count: number }> = {};

    orderData.ingredients.forEach((id) => {
      const ing = allIngredients.find((i) => i._id === id);
      if (!ing) return;
      if (!ingredientsMap[id]) {
        ingredientsMap[id] = { ...ing, count: 1 };
      } else {
        ingredientsMap[id].count += 1;
      }
    });

    const total = Object.values(ingredientsMap).reduce(
      (sum, ing) => sum + ing.price * ing.count,
      0
    );

    return {
      ingredientsInfo: ingredientsMap,
      ingredients: orderData.ingredients,
      total,
      date: new Date(orderData.createdAt),
      _id: orderData._id,
      status: orderData.status,
      name: orderData.name,
      createdAt: orderData.createdAt,
      updatedAt: orderData.updatedAt,
      number: orderData.number
    };
  }, [orderData, allIngredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
