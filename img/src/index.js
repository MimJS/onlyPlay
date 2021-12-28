import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import App from './App';
import registerServiceWorker from './sw';

// Init VK App
connect.send('VKWebAppInit', {});
connect.subscribe((e) => {
    switch (e.detail.type) {
        case 'VKWebAppUpdateConfig':
            let schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'space_gray';
            document.body.attributes.setNamedItem(schemeAttribute);
            break;

        default:
    }
});

//registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
