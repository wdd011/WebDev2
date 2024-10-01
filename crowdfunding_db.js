const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// 端口号
const port = 3000
// 解决跨域问题
app.use(cors())
// 使用 body-parser 中间件解析 JSON 数据  （此模块可以不要）
app.use(bodyParser.json())

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost', // IP
  user: 'root', // 用户名
  password: '123456', // 密码
  database: 'crowdfunding_db', // 数据库名称
})

// 连接到数据库
connection.connect(err => {
  if (err) {
    console.error('数据库连接失败: ' + err.stack)
    return
  }
  console.log('链接数据库成功')
})

// 获取所有活动的筹款活动，包括类别 （首页列表）
app.get('/api/fundraisers', (req, res) => {
  //SELECT fundraisers.*, categories.NAME  选择 fundraisers 表的所有列以及 categories 表的 NAME 列
  // FROM fundraisers, categories: 从 fundraisers 表和 categories 表中获取数据。
  // WHERE fundraisers.CATEGORY_ID = categories.CATEGORY_ID: 连接条件，fundraisers 表的 CATEGORY_ID 列必须与 categories 表的 CATEGORY_ID 列匹配。
  // AND fundraisers.ACTIVE = 1: 条件过滤，选取 ACTIVE 等于 1 的活跃筹款项目。
  const sql = `
        SELECT fundraisers.*, categories.NAME 
        FROM fundraisers, categories 
        WHERE fundraisers.CATEGORY_ID = categories.CATEGORY_ID 
        AND fundraisers.ACTIVE = 1;
    `
  connection.query(sql, (err, results) => {
    // 失败返回
    if (err) return res.status(500).send(err)
    res.json(results)
  })
})

// 获取所有类别
app.get('/api/categories', (req, res) => {
  // sql 语句表示 选择所有列的数据在categories表中
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).send(err)
    res.json(results)
  })
})

app.get('/api/fundraisers/search', (req, res) => {
  const { category, city, organizer } = req.query
  let query =
    `
      SELECT f.*, c.NAME AS category_name 
      FROM fundraisers f 
      JOIN categories c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE 1=1` +
    (category ? ` AND f.CATEGORY_ID = ?` : '') +
    (city ? ` AND f.CITY = ?` : '') +
    (organizer ? ` AND f.organizer LIKE ?` : '')
  const values = [...(category ? [category] : []), ...(city ? [city] : []), ...(organizer ? [`%${organizer}%`] : [])]
  connection.query(query, values, (err, results) => {
    if (err) throw err
    res.json(results)
  })
})

// 获取指定筹款人的详细信息
app.get('/api/fundraisers/:id', (req, res) => {
  const id = req.params.id
  const sql = `
        SELECT f.*, c.NAME AS category_name 
        FROM fundraisers f 
        JOIN categories c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.FUNDRAISER_ID = ?
    `
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err)
    if (results.length === 0) return res.status(404).send('筹款人未找到')
    res.json(results[0])
  })
})

// 启动服务器
app.listen(port, () => {
  console.log(`运行成功：http://localhost:${port}`)
})
