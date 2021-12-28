# Документация к апи

### Авторизация
Любой запрос, который отправляется на сервер - должен быть в формате POST и содержать в себе JSON тело с объектом авторизации
Пример:
```js
{
    "authorization": {
        "type": "vk-mini-apps",
        "vk": "?vk_access_token_settings=&vk_app_id=8020410&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1638884857&vk_user_id=521577793&sign=Tj0hB-Lnak2s_2mN4RR5yLdIldGY3I9LVu-okKrZRhk",
        "userId": "521577793"
    }
}
```
**ВАЖНО!** 
**userId** обязательно должен иметь тип **String**

### Обработка ошибок

**Критические ошибки** - это те ошибки, которые сопровождаются HTTP 400. При их появлении - стоит выводить перед пользователем ошибку об подключении к серверу.
**Ошибки при работе с функционалом** - они имеют HTTP 200 код, но в теле ответа содержится **status: false**. К примеру: 
```js
{
    "status": false,
    "response": {
        "error_code": 0,
        "error_msg": "INVALID request",
        "error_public": "Невалидный запрос к серверу."
    }
}
```