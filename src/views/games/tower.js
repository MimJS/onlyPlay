import {Panel, PanelHeader, PanelHeaderContent, PanelHeaderBack} from '@vkontakte/vkui'

const Tower = ({id, close}) => {
    return (
        <Panel id={id}>
            <PanelHeader separator={false}>
                <PanelHeaderContent before={<PanelHeaderBack hasHover={false} onClick={() => close()} />}>Tower</PanelHeaderContent>
            </PanelHeader>
        </Panel>
    )
}

export default Tower