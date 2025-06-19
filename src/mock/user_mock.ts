import {mock, type MockjsRequestOptions} from "mockjs";

// mock data
export function userMock(){
    mock(/.*?\/api\/login/, function (options: MockjsRequestOptions){
        return {
            code: 0,
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmlja19uYW1lIjoi5p6r5p6rIiwicm9sZSI6MSwidXNlcl9pZCI6MSwiZXhwIjoxNzE2Mzc4NTI1LjcyMDk4MiwiaXNzIjoiMTIzNCJ9.48zvrEbJ6KkUVIL8ivhdDQStm7d5FqhuZ7nf0xO-ydg",
            msg: "成功"
        }
    })

    // mock data
    mock("/.*?\/api/user_info/", function (options: MockjsRequestOptions){
        return {
            "code": 0,
            "data": {
                "id": 1,
                "createdAt": "2023-02-19T17:23:04.543+08:00",
                "nickname": "n_name",
                "username": "u_name",
                "avatarURL": "/xxx.png",
                "email": "123@qq.com",
                "addr": "内网地址",
                "token": "",
                "ip": "127.0.0.1",
                "role": 2,
            },
            "msg": "成功"
        }
    })
}