const Mock = require('mockjs');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// 转换body，用于接收body
app.use(bodyParser.json())

// app.get('/', (req, res) => res.send('Hello World!'));
const userData = {
  "Id": 1,
  "CreatedAt": "2020-06-18 10:01:10",
  "TenantId": 1,
  "Account": "admin",
  "Uuid": "",
  "Password": "$2a$10$pca1zalhaMBqt.1lWbyDZ.Ao0BgN83cAtWCkibhFqvZKj4n9Fp8Gu",
  "RealName": "",
  "Status": 0,
  "PhoneNumber": "",
  "EmailAddress": "",
  "PasswordResetCode": "",
  "PasswordResetCodeRepeat": "",
  "LastLoginTime": "2020-06-28 14:00:39",
  "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjQ4NjAwMzksImlkIjoxLCJsb2dpblR5cGUiOiJ0ZW5hbnRVc2VyIn0.BONFgrx5O5pX6zUnosr6Pxc5exuXzCyn-tK7ZTgit0w",
  "Role": {
    "Id": 11,
    "CreatedAt": "2020-06-18 10:01:10",
    "UpdatedAt": "2020-06-24 22:00:11",
    "RoleCode": "manager",
    "Name": "manager",
    "Remark": "\u5546\u6237\u7ba1\u7406\u5458",
    "Rights": null,
    "TenantUser": null,
    "TenantId": 1,
    "AddIds": null,
    "MenuIds": "",
    "CanLoginOnMobile": false
  },
  "Organization": null,
  "OrganizationIdsString": "",
  "EmployeeNo": "",
  "Counter": 0,
  "OrganizationId": 1,
  "OrganizationIds": null,
  "RoleId": 11,
  "Source": 0,
  "TenantName": "\u91d1\u543e\u540c",
  "CheckInTime": null,
  "CheckOutTime": null,
  "TenantStatus": 0,
  "ForMobile": false
}

// 登录
app.post('/api/tenantUser/login', (req, res) => {
  const { Password, Account } = req.body;

  if(Password === '123456' && Account === 'admin') {
    res.send({
      state: 'success',
      message: '',
      data: userData
    })

    return;
  }

  res.send({
    state: 'error',
    message: '登录失败'
  })
})

// 退出登录
app.post('/api/tenantUser/logOffForMobile', (req, res) => {
  res.send({
    state: 'success',
    message: '操作成功'
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))
