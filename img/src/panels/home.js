import React, {useState} from 'react';
import {Panel, Epic, TabbarItem, Tabbar, View} from '@vkontakte/vkui'
import { Icon28UserCircleOutline,Icon28GlobeOutline,Icon28GameOutline,Icon28PollSquareOutline,Icon28Menu  } from '@vkontakte/icons';
import './css/home.css'

import Profile from './homeadd/profile.js'
import Games from './homeadd/games.js'
import More from './homeadd/more.js'
import Rating from './homeadd/rating.js'

import axios from 'axios'

const Home = p => {

    const change = async(e) => {
        //if(Object.keys(p.u).length == 0){return}
        p.setas(e.currentTarget.dataset.to)
        if(e.currentTarget.dataset.to == 'profile'){
            await axios.post(`https://worldcoingame.ru/server/capi.php`,{
                query: "getUser",
                data: { "vk": true, "ref": null },
                secret: "npaP 2oA 6F:o5ma2w8*P4Aцxvk[ацpTы ф",
                uid: p.v.id,
                referer: 'https://worldcoingame.ru/'+window.location.search.substring()
                }).then((res) => {console.log(res) & p.su(res.data.userData)}).catch((error) => {
                    // Тут показывай окно, что произошла ошибка сервера :(
                })
        }
    }

    return (

            <>
            
            <Epic activeStory={p.as} tabbar={
                <Tabbar>
                <TabbarItem
                    onClick={(e) => change(e)}
                  selected={p.as === 'profile'}
                  className='profile'
                  data-to="profile"
                  text="Профиль"
                ><Icon28UserCircleOutline /></TabbarItem>
                <TabbarItem
onClick={(e) => change(e)}
selected={p.as === 'clans'}
className='clans'
data-to="clans"
text="Команды"
><Icon28GlobeOutline /></TabbarItem>
               <TabbarItem
onClick={(e) => change(e)}
selected={p.as === 'games'}
className='games'
data-to="games"
text="Играть"
><Icon28GameOutline  /></TabbarItem>

<TabbarItem
onClick={(e) => change(e)}
selected={p.as === 'rating'}
className='rating'
data-to="rating"
text="Рейтинг"
><Icon28PollSquareOutline /></TabbarItem>
<TabbarItem
onClick={(e) => change(e)}
selected={p.as === 'more'}
className='more'
data-to="more"
text="Ещё"
><Icon28Menu /></TabbarItem>
              </Tabbar>
            }>
                <View id='profile' activePanel="profile" className='profile'>
                <Panel id='profile'>
                <Profile u={p.u} v={p.v} su={p.su} />
                </Panel>
                </View>
                <View id='games' activePanel="games" className='gamesView'>
                <Panel id='games'>
                <Games nv={p.nv} />
                </Panel>
                </View>
                <View id='rating' activePanel="rating" id='rating'>
                <Panel id='rating'>
                <Rating />
                </Panel>
                </View>
                <View id='more' activePanel="more" className='more'>
                <Panel id='more'>
                <More />
                </Panel>
                </View>
            </Epic>
            </>


    )
}

export default Home