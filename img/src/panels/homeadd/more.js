import React from 'react'
import {PanelHeaderContent, PanelHeader, Group, List, Cell } from '@vkontakte/vkui'
import { Icon28Menu,Icon24Add,Icon24Gift,Icon24LogoVk,Icon24Headphones } from '@vkontakte/icons';
const More = p => {
    return(
        <>
        <PanelHeader>
            <PanelHeaderContent before={<Icon28Menu />}>
                Ещё
            </PanelHeaderContent>
        </PanelHeader>
        <Group>
            <List>
                <Cell hasHover={false} className="firstItem" before={<Icon24Add fill="rgb(255, 152, 0)" style={{ padding:'10px 16px 10px 0' }} />}>Добавить в сообщество</Cell>
                <Cell hasHover={false} before={<Icon24Gift  fill="rgb(156, 39, 176)" style={{ padding:'10px 16px 10px 0' }} />}>Активировать промо</Cell>
                <Cell hasHover={false} before={<Icon24LogoVk fill="rgb(3, 169, 244)" style={{ padding:'10px 16px 10px 0' }} />}>Наша группа</Cell>
                <Cell hasHover={false} before={<Icon24Headphones fill="rgb(33, 150, 243)" style={{ padding:'10px 16px 10px 0' }} />}>Тех. Поддержка</Cell>
            </List>
        </Group>
        </>
    )
}

export default More