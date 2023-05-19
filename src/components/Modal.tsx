import React, { ReactNode } from "react";
import { useParams } from "react-router";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { closeModal } from "../redux/reducers/modalReducer";
import { Product } from "../types/Product";
import {
  clearCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../redux/reducers/shoppingCartReducer";

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

interface CartType {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

interface CartItem extends Product {
  quantity: number;
  amount: number;
  cartId: string;
}

const Modal = (props: ModalProps) => {
  const isOpen = useAppSelector((state) => state.modalReducer.isOpen);
  const products = useAppSelector((state) => state.productsReducer.products);
  const { items, totalAmount, totalQuantity }: CartType = useAppSelector(
    (state) => state.shoppingCartReducer
  );
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const selectedProduct = products && products.find((product: Product) => product.id === Number(id));

  if (!props.isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {props.children}
        {items.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <ul>
            {items.map((item: Product) => (
              <li key={item.id}>
                {item.title}
                {item.price}
  
              </li>
            ))}
          </ul>
        )}
        <p>tämä on total amount {totalAmount}</p>
        <p>Tämä on total guntity {totalQuantity}</p>
        <button onClick={handleClearCart}>Clear cart</button>
      </div>
    </div>
  );
};

export default Modal;
