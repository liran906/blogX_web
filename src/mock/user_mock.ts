import {mock, type MockjsRequestOptions} from "mockjs";

export function userMock(){
    mock(/.*?\/api\/email_login/, function (options: MockjsRequestOptions){
        return {
            code: 0,
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi5p6r5p6rIiwicm9sZSI6MSwidXNlcl9pZCI6MSwiZXhwIjoyNTgwNjk1NjE1Ljc1NDg1LCJpc3MiOiIxMjM0In0.791XW8rCtwDqtyiLT8-RjCmbjdvZtqkc2Jm_W7wd-As",
            msg: "成功"
        }
    })

    mock(/.*?\/api\/logout/, function (options: MockjsRequestOptions){
        return {
            code: 0,
            data: "",
            msg: "成功"
        }
    })


    mock(/.*?\/api\/user_info/, function (options: MockjsRequestOptions){
        return mock({
            "code": 0,
            "data": {
                "id": 1,
                "createdAt": "2023-02-19T17:23:04.543+08:00",
                "nickname": "@cname",
                "username": "@name",
                "avatarURL": "/logo.png",
                "email": "2663456523@qq.com",
                "addr": "内网地址",
                "ip": "127.0.0.1",
                "role": 1,
                "link": "http://www.fengfengzhidao.com"
            },
            "msg": "成功"
        })
    })

    mock(/.*?\/api\/users/, function (){
        return mock({
            code: 0,
            msg: "成功",
            data: {
                count: 4,
                "list|3-10": [
                    {
                        "id": 27,
                        "createdAt": "2024-05-25T22:01:41.184+08:00",
                        "nickname": "@cname",
                        "username": "@name",
                        "avatarURL": "@img(100x100)",
                        "email": "",
                        "addr": "内网地址",
                        "ip": "127.0.0.1",
                        "role": "用户",
                        "sign_status": "邮箱",
                        "link": "",
                        "role_id": 2
                    },
                ]
            }
        })
    })
}