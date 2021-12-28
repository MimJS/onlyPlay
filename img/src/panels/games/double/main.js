import React, {useState, useEffect} from 'react'
import { Cell, PanelHeaderContent, Panel, PanelHeader, PanelHeaderButton, Avatar, Div, Header, HorizontalScroll,FormLayout, Button, Input, FormItem, FormStatus} from '@vkontakte/vkui'
import { Icon28ChevronBack,Icon56RecentOutline,Icon24DoneOutline } from '@vkontakte/icons';
import { ReactComponent as VKCoinIcon } from './icons/vkcoin.svg';
import './css/main.css'
import io from 'socket.io-client' // socket
import doubleimg from './img/double.png'
const Double = p => {

    const [c,setc] = useState(0)
    const [bal,setbal] = useState(0)
    const [gd, setgd] = useState({})
    const [sd, setsd] = useState({
        'sum':0,
        'btn':0
    })
    const [token, settoken] = useState(``)
    const [timer, settimer] = useState(null)
    const [err,seterr] = useState({
        's':0,
        'm':``
    })
    const cs = (e) => {
        if(e == '-'){
            setsd({...sd, sum:0})
            return
        }
        if(e < 0){
            setsd({...sd, sum:0})
            return
        }
        if(e.indexOf(`,`) != -1){
            e.split(`,`)[0]
        }
        if(e.indexOf(`.`) != -1){
            e.split(`.`)[0]
        }
        if(Number(e) <= Number(bal)){
            setsd({...sd, sum:Number(e)})
            return
        }
        if(Number(bal) == 0){
            setsd({...sd, sum:0})
            return
        }
        if(Number(e) > Number(bal)){
            setsd({...sd, sum:Number(bal)})
            return
        }
    }

    useEffect(() => {
        if(c == 0){
            // тут сокет
            window.socket.connect()
            window.socket.on(`connect`, (m) => {
                window.socket.emit(`message`,{
                "game":17,
                "type":"init",
                "user":p.v.id,
                "referer":"https://worldcoingame.ru/" + window.location.search.substring()})
            })
            setc(1)
        }
    }, [c])

    window.socket.on(`message`, (m) => {
        if(m.type == 'init'){
            if(m.status == false){
                // Ошибка доступа к игре
            } else if(m.status == true && c == 1) {
                setc(2)
                settoken(m.token)
                window.socket.emit(`message`,{type: "join", room: m.roomId, user: p.v.id, token: m.token})
            }
        }
        if(m.type == 'balance'){
            setbal(m.balance.coins)
        }
        if(m.type == 'update'){
            setgd(m)
            setbal(m.private.balance.coins)
        }
        if(m.type == 'timer'){
            
            if(m.timer > 1){
                settimer(m.timer)
            } else {
                settimer(null)
            }
        }
        if(m.type == 'setBet'){
            if(m.status == false){
                seterr({
                    s:1,
                    m:m.error
                })
            }
            if(m.status == true){

            }
        }
    })

    return(
        <>
        <Panel id={p.id}>
            <PanelHeader>
                <PanelHeaderContent before={<PanelHeaderButton hasHover={false}><Icon28ChevronBack width={20} height={28} style={{ padding:8 }} onClick={() => p.nv(`main`) & window.socket.disconnect()} /></PanelHeaderButton>}>
                    Double
                </PanelHeaderContent>
            </PanelHeader>
            <div className="gameContent">
            <div className="paddingWrapper">
                <div className='balanceBlock'>
                    <div className='verticalText'>{number_format(bal)}</div>
                    <VKCoinIcon width={18} height={18} fill="black" className='chipsIcon' />
                </div>

                {Object.keys(gd).length > 0 &&
                <div className='history'>
                    <Header>ИСТОРИЯ ИГР</Header>
                    <HorizontalScroll className="wrapper">

                    {gd.history.length > 0 &&
                    gd.history.map((d) => (
                        <div className={`item t${d}`}>
                        <div className={`historyBlock type${d}`}></div>
                    </div>   
                    ))
                    }

                    </HorizontalScroll>
                </div>
}

                {gd.state == 0 &&
                <div className='table state0'>
                <Icon56RecentOutline className='waitIcon' />
                <div className="waitText">Ожидание ставок...</div>
                </div>
}

{(gd.state == 1 || gd.state == 3) && 
                <div className="table">
                    <div className="RouletteFortune">
                        <div className="roulette-container">
                            <img src={doubleimg} className='roulette-canvas canvas' />
                        </div>
                    </div>
                    <div className="timer">{timer}</div>
                </div>
}

            </div>
            {Object.keys(gd).length > 0 &&
            <>
            <div className="buttonsBlock">
                {(gd.state != 3 && gd.bets.hasOwnProperty(p.v.id) == false) && 
                <FormLayout style={{ paddingTop:0, paddingLeft:0, paddingRight:0 }}>
                    <FormItem style={{ paddingTop:0, padding:'0 var(--padding_left_vk)', marginBottom:10 }}>
                    <div className='betButtons'>
                    <Button hasHover={false} className="betButton b1" size='s' onClick={() => setsd({...sd, sum: sd.sum+100000})}>+100K</Button>
                    <Button hasHover={false} className="betButton b2" size='s' onClick={() => setsd({...sd, sum: sd.sum+1000000})}>+1KK</Button>
                    <Button hasHover={false} className="betButton b3" size='s' onClick={() => setsd({...sd, sum: sd.sum+5000000})}>+5KK</Button>
                    <Button hasHover={false} className="betButton b4" size='s' onClick={() => setsd({...sd, sum: sd.sum+25000000})}>+25KK</Button>
                    </div>
                    </FormItem>

                    <div className='inputBetWrapper'>
                        <FormLayout style={{ paddingLeft:0, padding:'0 var(--padding_left_vk)' }}>
                            <FormItem bottom={err.m} status={err.s == 1 && `error`} style={{ padding:0 }}>
                            <Input onChange={(e) => cs(e.currentTarget.value)} value={sd.sum == `0` ? `` : sd.sum} placeholder="Ваша ставка" inputmode="numeric" alignment="center" type="text"  />
                            </FormItem>
                        </FormLayout>
                        <div className='mbWrapper'>
                            <div className="mb n1" onClick={() => setsd({...sd, sum: Number(sd.sum / 2).toFixed(2)})}>/2</div>
                            <div className="mb n2">x2</div>
                        </div>
                    </div>

                    <div className='targetButtons' style={{ marginTop : err.s == 1 && 10  }}>
                        <div onClick={() => setsd({...sd, btn:0})} className={`button b1 ${sd.btn == 0 && `a`}`}>x2</div>
                        <div onClick={() => setsd({...sd, btn:1})} className={`button b2 ${sd.btn == 1 && `a`}`}>x3</div>
                        <div onClick={() => setsd({...sd, btn:2})} className={`button b3 ${sd.btn == 2 && `a`}`}>x5</div>
                        <div onClick={() => setsd({...sd, btn:3})} className={`button b4 ${sd.btn == 3 && `a`}`}>x50</div>
                    </div>
                    <FormItem style={{ paddingBottom:0, padding:'0 var(--padding_left_vk)', marginTop:10 }}>
                    <Button onClick={() => {
                        window.socket.emit(`message`, {"type":"action","a":"setBet","t":sd.btn,"cy":"coins","bet":sd.sum,"user":p.v.id,"token":token})
                    }} size='l' stretched before={<Icon24DoneOutline />}>Поставить</Button>
                    </FormItem>
                </FormLayout>
}
{(gd.state != 0 && gd.bets.hasOwnProperty(p.v.id) == true) &&
                <FormStatus header="Ваша ставка" className={gd.state == 3 ? `winStatus` : `winStatusDef`} style={{ margin:'0 var(--padding_left_vk)' }} mode={gd.state == 3 && gd.bets[p.v.id].type != gd.hashPass.split(`@`)[1] ? `error` : `def`}>
                        <div className='verticalText'>{number_format(gd.bets[p.v.id].sum)}</div> 
                        <VKCoinIcon className="vkIcon" fill='black' width={16} height={16} />
                        <div className={`myBetType type${gd.bets[p.v.id].type}`}>x{gd.bets[p.v.id].type == 0 ? `2` : gd.bets[p.v.id].type == 1 ? `3` : gd.bets[p.v.id].type == 2 ? `5` : `50` }</div>
                    </FormStatus>
}
            </div>
            
            <div className="betsList">
            {gd.state == 1 &&
                Object.keys(gd.bets).length > 0 &&
                Object.keys(gd.bets).map((k,i) => (
                    <Cell disabled className='betCell' key={i} before={<Avatar src={p.v.photo_100} size={40} />} indicator={<div className={`betType t${gd.bets[k].type}`}>{gd.bets[k].type == 0 ? `x2` : gd.bets[k].type == 1 ? `x3` : gd.bets[k].type == 2 ? `x5` : `x50` }</div>} description={<>
                        <div className="verticalText">{number_format(gd.bets[k].sum)}</div>
                        <VKCoinIcon className="vkIcon" fill='black' width={16} height={16} />
                    </>}><div className="usersColorsBase-0">Имя Фамилия</div></Cell>
                ))
}

{gd.state == 3 &&
                Object.keys(gd.bets).length > 0 &&
                Object.keys(gd.bets).map((k,i) => (
                    <Cell disabled className='betCell' key={i} before={<Avatar src={p.v.photo_100} size={40} />} indicator={<div className={`betType t${gd.bets[k].type}`}>{gd.bets[k].type == 0 ? `x2` : gd.bets[k].type == 1 ? `x3` : gd.bets[k].type == 2 ? `x5` : `x50` }</div>} description={<>
                        <div className="verticalText" style={{ color:gd.bets[k].type == gd.hashPass.split(`@`)[1] ? `#56BE7E` : `#EE5E55` }}>{gd.bets[k].type == gd.hashPass.split(`@`)[1] ? `+ ` : `- `} {number_format(gd.bets[k].sum)}</div>
                        <VKCoinIcon className="vkIcon" width={16} height={16} />
                    </>}><div className="usersColorsBase-0">Имя Фамилия</div></Cell>
                ))
}
            </div>

            {gd.state == 3 && 
            <Div className="Footer">Hash: {gd.hash}<br/>Check md5: {gd.hashPass}</Div>
} 


{gd.state != 3 &&
    <Div className="Footer">Hash: {gd.hash}</Div>
}
</>
}

        </div>
        </Panel>
        </>        
    )
}

function number_format( number, decimals, dec_point, thousands_sep ) {
    var i, j, kw, kd, km;
    if( isNaN(decimals = Math.abs(decimals)) ){
    decimals = 0;
    }
    if( dec_point == undefined ){
    dec_point = ".";
    }
    if( thousands_sep == undefined ){
    thousands_sep = " ";
    }
  
    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
  
    if( (j = i.length) > 3 ){
    j = j % 3;
    } else{
    j = 0;
    }
  
    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
    return km + kw + kd;
    }


export default Double