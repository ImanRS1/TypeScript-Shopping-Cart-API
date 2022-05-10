import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { useQuery } from 'react-query'

import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

import { Wrapper } from '../styles/App.styles'

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async () => {
  await (await fetch('https://fakestoreapi.com/products')).json();
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
