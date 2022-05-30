import type { NextPage } from "next";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";

import { useState } from "react";
import { useQuery } from "react-query";

import Item from "../components/Item";
import Drawer from "@material-ui/core/Drawer";
import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Cart from "../components/Cart";

import { CartItemType } from "./_app";

const Home: NextPage = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch("https://fakestoreapi.com/products")).json();

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev: any) => {
      const isItemInCart: boolean = prev.find(
        (item: CartItemType) => item.id === clickedItem.id
      );
      if (isItemInCart) {
        return prev.map((item: CartItemType) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev: any) =>
      prev.reduce((ack: any, item: any) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

  if (error) return <div>Something went wrong... </div>;

  return (
    <div>
      <Head>
        <title>TS-API Shopping Cart</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <div className="titles">
          <h1>TypeScript Api Shopping Cart</h1>
          <p>Powered by fakestoreapi.com</p>
        </div>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />

          <StyledCloseButton>
            <CloseIcon
              onClick={() => setCartOpen(false)}
              className="close-icon"
            />
          </StyledCloseButton>
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </StyledButton>
        {/* {cartOpen ? (
          <StyledCloseButton onClick={() => setCartOpen(false)}>
            hej
          </StyledCloseButton>
        ) : null} */}
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
};

export default Home;

const Wrapper = styled.div`
  padding: 3rem;
  max-width: 1440px;
  margin: 0 auto;

  .titles {
    text-align: center;

    h1 {
      margin: 0;
    }
  }
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 10px;
  top: 10px;
`;

const StyledCloseButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 10px;
  top: 10px;
`;
