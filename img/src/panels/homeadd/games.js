import React from 'react'
import {PanelHeader, PanelHeaderContent, Group, List} from '@vkontakte/vkui'
import { Icon28GameOutline } from '@vkontakte/icons';
const Games = p => {
    return (
        <>
        <PanelHeader>
            <PanelHeaderContent before={<Icon28GameOutline />}>
                Игры
            </PanelHeaderContent>
        </PanelHeader>
        <div className='panel'>
        <Group>
            <List>
                <div className='room wheel'>
                    <div className='bg'></div>
                    <div className='text'>Wheel</div>
                </div>
                <div className='room dice'>
                    <div className='bg'></div>
                    <div className='text'>Под 7 Над</div>
                </div>
                <div className='room double' onClick={() => p.nv(`gameDouble`)}>
                    <div className='bg'></div>
                    <div className='text'>Double</div>
                </div>
                <div className='room n1'>
                    <div className='bg'></div>
                    <div className='text'>Dice</div>
                </div>
            </List>
        </Group>
        </div>
        </>
    )
}

export default Games