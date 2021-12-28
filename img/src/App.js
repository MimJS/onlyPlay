import React, { useEffect, useState } from 'react';
import {isAndroid} from 'react-device-detect';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider,  View, Root, ScreenSpinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './panels/home.js'
import Double from './panels/games/double/main.js'

import './panels/css/global.css'

import axios from 'axios';

import io from 'socket.io-client' // socket

const leg = 'https://worldcoingame.ru'
const add = leg
const v = 1;

const App = props => {
        // All consts    
       
        const [ud, setud] = useState([])
        const [vkd, setvkd] = useState([])
        const [pop, setpop] = useState(<ScreenSpinner />)

        const [view, setview] = useState(`main`)

        // For home

        
        const [as, setas] = useState(`profile`)

        useEffect(async() => {
            if(ud.length == 0){
                let data = await bridge.send("VKWebAppGetUserInfo")
                setvkd(data)
                console.log(data)
                connect(data.id)
            }
        },[ud])

        const connect = async(uid) => {
            console.log(window.location.search.substring())
            await axios.post(`http://localhost/server/capi.php`,).then((res) => {setpop(null) & console.log(res) & setud(res.data.userData)}).catch((error) => {
                    // Тут показывай окно, что произошла ошибка сервера :(
                        setpop(null) //убрать
                })
        }

        const nview = (name) => {
            if(name == view){return}
            //if(Object.keys(ud).length == 0){return}
            if(view == 'gameDouble' && name == 'home'){
                setas(`games`)
            }
            setview(name)
        }

        window.socket = io.connect(`https://worldcoingame.ru`, {
            autoConnect: false,
            secure: true,
            reconnection:false,
            transports: ['websocket']
        })

        window.socket.on(`disconnect`, (m) => {
            console.log(`DISC`)
        })

        return (
            
            <ConfigProvider isWebView={false} platform={isAndroid == true ? 'android' : `ios`}>
            <Root activeView={view} popout={pop}>
                <View id='main' activePanel={`main`}>
                <Home id='main' u={ud} v={vkd} su={setud} nv={nview} as={as} setas={setas} />
                </View>
                <View id='gameDouble' activePanel={`game`} className='gameDouble'>
                <Double id='game' v={vkd} nv={nview} />
                </View>
                </Root>
            </ConfigProvider>
        );
    }

export default App;

