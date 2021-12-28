import React, {useState,useEffect} from 'react'
import {Avatar, PanelHeader, PanelHeaderContent, PullToRefresh, Div} from '@vkontakte/vkui'
import {Icon24MoneySendOutline, Icon24MoneyRequestOutline,Icon24Coins,Icon24Poll } from '@vkontakte/icons'
import { ReactComponent as VKCoinIcon } from '../icons/vkcoin.svg';
import axios from 'axios'

const Profile = p => {

    const [sd, setsd] = useState(false)
    const [sa, setsa] = useState(false)

    const [f,setf] = useState(false)
    const onref = async(uid) => {
        setf(true)
        await axios.post(`http://localhost/server/capi.php`,{
                query: "getUser",
                data: { "vk": true, "ref": null },
                secret: "npaP 2oA 6F:o5ma2w8*P4Aцxvk[ацpTы ф",
                uid: uid,
                referer: 'https://worldcoingame.ru/'+window.location.search.substring()
                }).then((res) => {setf(false) & console.log(res) & p.su(res.data.userData)}).catch((error) => {
                    // Тут показывай окно, что произошла ошибка сервера :(
                        setf(false)
                })
    }

    return(
        <>
        <PanelHeader separator={false}>
                <PanelHeaderContent before={Object.keys(p.u).length > 0 ? <Avatar size={40} src={p.u.vk.photo_100} /> : <Avatar size={40} src={``} style={{ background: 'var(--placeholder_icon_background)' }} /> }>
                    Профиль
                </PanelHeaderContent>
            </PanelHeader>
        {Object.keys(p.u).length > 0 &&
         <>
            <PullToRefresh onRefresh={() => onref(p.v.id)} isFetching={f}>
                <div className="paddingControlWrapper profile">
                    <div className="balanceWrapper">
                        <div className="balance">
                            <div className="coinsTop">БАЛАНС</div>
                            <div className="coins">
                                <div className="verticalText">{number_format(p.u.coins)}</div>
                                <VKCoinIcon width={30} height={30} fill='white' className="vkIcon" />
                            </div>
                        </div>
                    </div>
                    <div className="balanceButtons">
                        <div className="but buy">
                            <Icon24MoneySendOutline width={36} height={36} fill="white" />
                            <span>Пополнить</span>
                        </div>
                        <div className="but sell">
                            <Icon24MoneyRequestOutline width={36} height={36} fill="white" />
                            <span>Вывести</span>
                        </div>
                    </div>
                </div>
                <div className="statsBlock">
                    <div className="stat today">
                        <div className="blockTitleWrapper">
                            <div className="blockTitle">Статистика за день</div>
                            {sd == false &&
                            <Icon24Coins width={18} height={18} className="updateMode" onClick={() => setsd(true)} />
                            }
                            {sd == true &&
                            <Icon24Poll width={18} height={18} className="updateMode" onClick={() => setsd(false)} />
                            }
                        </div>

                       <>
                        <div className="winBlock" style={{ width:sd == false ? `${p.u.stat_day_win == p.u.stat_day_lose ? '50' : Number(p.u.stat_day_win / (p.u.stat_day_win + p.u.stat_day_lose) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_day_win / (p.u.stat_day_win + p.u.stat_day_lose)  * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_day_win / (p.u.stat_day_win + p.u.stat_day_lose) * 100).toFixed(2) }%` : `${p.u.stat_day_win_sum == p.u.stat_day_lose_sum ? '50' : Number(p.u.stat_day_win_sum / (p.u.stat_day_win_sum + p.u.stat_day_lose_sum) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_day_win_sum / (p.u.stat_day_win_sum + p.u.stat_day_lose_sum)  * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_day_win_sum / (p.u.stat_day_win_sum + p.u.stat_day_lose_sum) * 100).toFixed(2) }%` }}>
                                <div className="title">{sd == false ? `Выигрыши` : `Выигрыно`}</div>
                                <div className="sum">{sd == false ? p.u.stat_day_win : shortnum(p.u.stat_day_win_sum)}</div>
                            </div>
                            <div className="loseBlock" style={{ width:sd == false ? `${p.u.stat_day_win == p.u.stat_day_lose ? '50' : Number(p.u.stat_day_lose / (p.u.stat_day_win + p.u.stat_day_lose) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_day_lose / (p.u.stat_day_win + p.u.stat_day_lose) * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_day_lose / (p.u.stat_day_win + p.u.stat_day_lose) * 100).toFixed(2) }%` : `${p.u.stat_day_win_sum == p.u.stat_day_lose_sum ? '50' : Number(p.u.stat_day_lose_sum / (p.u.stat_day_win_sum + p.u.stat_day_lose_sum) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_day_lose_sum / (p.u.stat_day_win_sum + p.u.stat_day_lose_sum) * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_day_lose_sum / (p.u.stat_day_win_sum + p.u.stat_day_lose_sum) * 100).toFixed(2) }%` }}>
                                <div class="title">{sd == false ? 'Проигрыши' : 'Проиграно'}</div>
                                <div class="sum">{sd == false ? p.u.stat_day_lose : shortnum(p.u.stat_day_lose_sum)}</div>
                            </div>
                       </>
                       
                      
                    </div>
                    <div className="stat all">
                        <div className="blockTitleWrapper">
                            <div className="blockTitle">ЗА ВСЕ ВРЕМЯ</div>
                            {sa == false &&
                            <Icon24Coins width={18} height={18} className="updateMode" onClick={() => setsa(true)} />
                            }
                            {sa == true &&
                            <Icon24Poll width={18} height={18} className="updateMode" onClick={() => setsa(false)} />
                            }
                        </div>

                       <>
                       <div className="winBlock" style={{ width:sa == false ? `${p.u.stat_win == p.u.stat_lose ? '50' : Number(p.u.stat_win / (p.u.stat_win + p.u.stat_lose) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_win / (p.u.stat_win + p.u.stat_lose)  * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_win / (p.u.stat_win + p.u.stat_lose) * 100).toFixed(2) }%` : `${p.u.stat_win_sum == p.u.stat_lose_sum ? '50' : Number(p.u.stat_win_sum / (p.u.stat_win_sum + p.u.stat_lose_sum) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_win_sum / (p.u.stat_win_sum + p.u.stat_lose_sum)  * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_win_sum / (p.u.stat_win_sum + p.u.stat_lose_sum) * 100).toFixed(2) }%` }}>
<div className="title">{sa == false ? `Выигрыши` : `Выигрыно`}</div>
<div className="sum">{sa == false ? p.u.stat_win : shortnum(p.u.stat_win_sum)}</div>
</div>
<div className="loseBlock" style={{ width:sa == false ? `${p.u.stat_win == p.u.stat_lose ? '50' : Number(p.u.stat_lose / (p.u.stat_win + p.u.stat_lose) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_lose / (p.u.stat_win + p.u.stat_lose) * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_lose / (p.u.stat_win + p.u.stat_lose) * 100).toFixed(2) }%` : `${p.u.stat_win_sum == p.u.stat_lose_sum ? '50' : Number(p.u.stat_lose_sum / (p.u.stat_win_sum + p.u.stat_lose_sum) * 100).toFixed(2) > 60 ? `60` : Number(p.u.stat_lose_sum / (p.u.stat_win_sum + p.u.stat_lose_sum) * 100).toFixed(2) < 40 ? `40` : Number(p.u.stat_lose_sum / (p.u.stat_win_sum + p.u.stat_lose_sum) * 100).toFixed(2) }%` }}>
<div class="title">{sa == false ? 'Проигрыши' : 'Проиграно'}</div>
<div class="sum">{sa == false ? p.u.stat_lose : shortnum(p.u.stat_lose_sum)}</div>
</div>
                       </>
                       
                      
                    </div>
                </div>
                <Div className="Footer">
                    Онлайн : {p.u.online}
                </Div>
            </PullToRefresh>
            </>
        }
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

function shortnum(num) {
    let n = num.toString()
    if(n.length < 4){
        return n
    }
    if(n.length >= 4 && n.length <= 6){
        if(Number(n / 1000).toFixed(1).split(`.`)[1] > 0){
        return Number(n / 1000).toFixed(1) + `K`
        } else {
            return Number(n / 1000).toFixed(0) + `K`
        }
    }
    if(n.length >= 7 && n.length <= 9){
        if(Number(n / 1000000).toFixed(1).split(`.`)[1] > 0){
            return Number(n / 1000000).toFixed(1) + `KK`
            } else {
                return Number(n / 1000000).toFixed(0) + `KK`
            }
    }
    if(n.length >= 10 && n.length <= 12){
        if(Number(n / 1000000000).toFixed(1).split(`.`)[1] > 0){
            return Number(n / 1000000000).toFixed(1) + `KKK`
            } else {
                return Number(n / 1000000000).toFixed(0) + `KKK`
            }
    }
}

export default Profile