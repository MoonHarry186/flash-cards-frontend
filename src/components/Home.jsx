import React, { useContext } from 'react'
import Layout from '../layout/Layout'
import { GlobalContext } from '../context/GlobalState'

const Home = () => {
  const context = useContext(GlobalContext)
  console.log(context);
  return (
    <Layout>
      Home
    </Layout>
  )
}

export default Home
