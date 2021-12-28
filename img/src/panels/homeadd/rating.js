import React, {useState} from 'react'
import {PanelHeader, PanelHeaderContent, Tabs, TabsItem, PullToRefresh, List,Div, SimpleCell, Avatar} from '@vkontakte/vkui'
import { Icon28PollSquareOutline,Icon16Stars,Icon16Globe,Icon16ClockOurline,Icon24Chevron } from '@vkontakte/icons';

const Rating = p => {

    const [s, sets] = useState(`day`)

    return (
        <>
        <PanelHeader>
            <PanelHeaderContent before={<Icon28PollSquareOutline />}>
                Рейтинг
            </PanelHeaderContent>
        </PanelHeader>
        <Tabs>
                <TabsItem
                hasHover={false}
                    onClick={() => sets(`hour`)}
                  selected={s === 'hour'}
                >
                  Топ часа
                </TabsItem>
                <TabsItem
                hasHover={false}
                 onClick={() => sets(`day`)}
                  selected={s === 'day'}
                >
                  Топ дня
                </TabsItem>
                <TabsItem
                hasHover={false}
                 onClick={() => sets(`week`)}
                  selected={s === 'week'}
                >
                  Топ недели
                </TabsItem>
              </Tabs>
              {s == 'hour' &&
        <div className='paddingWrapper'>
        <div className='ratingBanner'>
            <div className='title'>
                <div className='icon'><Icon16ClockOurline width={28} height={28} /></div>
                <div className='text'>Топ часа</div>
            </div>
            <div className='desc'>Каждый час с 12:00 по 22:00 мы разыгрываем <div className='sum'>30KK VKC</div> среди топ-5 лучших игроков.<br/></div>
            <div className='bottom'>
                <div className='time'>
                    <div className='header'>ВЫДАЧА ПРИЗОВ</div>
                    <div className='value'>в 13:00</div>
                </div>
                <div className='sep'></div>
                <div className='bank'>
                    <div className='header'>НАГРАДА</div>
                    <div className='value'>30KK VKC</div>
                </div>
            </div>
        </div>
    </div>
        }
        {s == 'day' && 
        <div className='paddingWrapper'>
        <div className='ratingBanner'>
            <div className='title'>
                <div className='icon'><Icon16Stars width={28} height={28} /></div>
                <div className='text'>Топ дня</div>
            </div>
            <div className='desc'>Каждый день в 0:00 мы разыгрываем <div className='sum'>1KKK VKC</div> среди топ-50 лучших игроков.<br/></div>
            <div className='bottom'>
                <div className='time'>
                    <div className='header'>ВЫДАЧА ПРИЗОВ</div>
                    <div className='value'>в 0:00</div>
                </div>
                <div className='sep'></div>
                <div className='bank'>
                    <div className='header'>НАГРАДА</div>
                    <div className='value'>1KKK VKC</div>
                </div>
            </div>
        </div>
    </div>
        }
        {s == 'week' &&
        <div className='paddingWrapper'>
        <div className='ratingBanner'>
            <div className='title'>
                <div className='icon'><Icon16Globe width={28} height={28} /></div>
                <div className='text'>Топ недели</div>
            </div>
            <div className='desc'>Каждую неделю в ночь с воскресенья на понедельник мы разыгрываем <div className='sum'>3KKK VKC</div> среди топ-10 лучших игроков.<br/></div>
            <div className='bottom'>
                <div className='time'>
                    <div className='header'>ВЫДАЧА ПРИЗОВ</div>
                    <div className='value'>в понедельник</div>
                </div>
                <div className='sep'></div>
                <div className='bank'>
                    <div className='header'>НАГРАДА</div>
                    <div className='value'>3KKK VKC</div>
                </div>
            </div>
        </div>
    </div>
        }
        <PullToRefresh>
            <List>
                <div>
                   {s == 'hour' &&  <Div className="Footer">Топ дня будет запущен за час до следующей выдачи</Div>}
                   {s != 'hour' && 
                   <>
                <SimpleCell before={<><table className='table'>
                    <tr>
                        <td>
                        <div class="ratingPosition">1</div>
                        </td>
                        <td style={{position: 'relative'}}>
                            <Avatar className='ratingAvatar' size={48} src="https://sun1-93.userapi.com/s/v1/ig2/MhlbdWlCOKHbltOVCESVn4kKbfkTtFviztlHzMspIbNysAbFwfF4nrQ6yHcsaGTHBNw2Fkea3tkaiNTABI-YX2Gk.jpg?size=200x0&quality=95&crop=0,10,800,800&ava=1" />
                        </td>
                    </tr>
                </table>
                </>} description={`1 280 000 000 VKC`} indicator={<>
                <div className="prize">
                    <div className="header">ПОЛУЧИТ</div>
                    <div className="sum">300KK</div>
                </div>
                </>} after={<Icon24Chevron />}>Великая Пандочка</SimpleCell>
                   </>}
                </div>
            </List>
        </PullToRefresh>
        </>
    )
}

export default Rating