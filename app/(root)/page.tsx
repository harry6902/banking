import React from 'react'
import Headerbox from '@/components/Headerbox'
import Head from 'next/head'
import TotalBalanceBox from '../../components/TotalBalanceBox';
import RightSideBar from '@/components/ui/RightSideBar';

const Home = () => {
    const loggedIn ={firstName: 'Hari', lastName:'Manepalli', email :'manepallihari2002@gmail.com'};
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <Headerbox 
                 type="greeting"
                 title="Welcome"
                 user={loggedIn?.firstName || 'Guest'}
                 subtext="Access and manage your account and transactions efficiently"

                />
                <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.00}
                />
            </header>
            RECENT TRANSACTIONS

        </div>
        <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:123},{ currentBalance:155}]}
         />
    </section>

  )
}

export default Home
