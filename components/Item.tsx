/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";

import { CartItemType } from "../pages/_app";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <textarea readOnly>{item.description}</textarea>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  background-color: #fefbe9;
  border: 5px solid #183a1d;
  button {
    border-radius: 0 0 20px 20px;
  }

  img {
    height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  div {
    font-family: "Roboto Mono", monospace;
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;

    h3 {
      color: #f0a04b;
    }

    textarea {
      overflow-y: scroll;
      resize: none;
      width: 100%;
      height: 10rem;
      user-select: none;
      background-color: transparent;
      border: none;
      flex-grow: 1;
      font-family: "Roboto Mono", monospace;
    }

    textarea::-webkit-scrollbar {
      width: 0.3rem;
      border-radius: 0.5rem;
    }

    textarea::-webkit-scrollbar-track {
      //  d -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    textarea::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      // d outline: 1px solid slategrey;
    }
  }
`;
