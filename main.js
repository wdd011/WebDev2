// 获取导航链接
const links = document.querySelectorAll('#nav a')
const currentPath = window.location.pathname // 当前路径

// 遍历每个链接
links.forEach(link => {
  // 如果链接的 href 与当前路径相同
  if (link.getAttribute('href').split('/').pop() === currentPath.split('/').pop()) {
    link.classList.add('active') // 添加 active 类

    // 如果是 FundraisingList.html 页面
    if (link.getAttribute('href').split('/').pop() === 'FundraisingList.html') {
      fetch(`http://localhost:3000/api/categories`) // 获取分类数据
        .then(response => response.json())
        .then(data => {
          const categoryElement = document.getElementById('category') // 使用不同的变量名
          // 遍历分类数据
          for (let index = 0; index < data.length; index++) {
            const element = data[index]
            const html = dome2(element) // 获取分类 HTML
            categoryElement.insertAdjacentHTML('beforeend', html) // 插入分类 HTML
          }
          getSearch() // 获取搜索结果
        })
    }

    // 如果是 index.html 页面
    if (link.getAttribute('href').split('/').pop() === 'index.html') {
      fetch(`http://localhost:3000/api/fundraisers`) // 获取筹款数据
        .then(response => response.json())
        .then(data => {
          const fundraisersElement = document.getElementById('fundraisers') // 使用不同的变量名
          // 遍历筹款数据
          for (let index = 0; index < data.length; index++) {
            const html = dome(data[index]) // 获取筹款 HTML
            fundraisersElement.insertAdjacentHTML('beforeend', html) // 插入筹款 HTML
          }
          const doms = document.querySelectorAll('.fundraiser-card') // 获取所有筹款卡片
          doms.forEach((item, index) => {
            // 为每个筹款卡片添加点击事件
            item.addEventListener('click', () => go('./particulars.html?id=' + data[index].FUNDRAISER_ID))
          })
        })
    }
  }
})

// 获取 URL 中的查询参数
const search = window.location.search
const params = new URLSearchParams(search)
if (params.get('id')) {
  fetch(`http://localhost:3000/api/fundraisers/` + params.get('id')) // 根据 ID 获取筹款详情
    .then(response => response.json())
    .then(data => {
      const categoryElement = document.getElementById('details') // 使用不同的变量名
      categoryElement.insertAdjacentHTML('beforeend', dome3(data)) // 插入筹款详情 HTML
    })
}

// 导航到指定 URL
const go = url => {
  window.location.href = url
}

// 获取筹款 HTML
function dome(data) {
  return `
	  <div class="fundraiser-card" id="fundraiser-card">
		<img class="fundraiser-image" src="https://images.gofundme.com/gDgGwtZSszbJzG7qEMvuJXOUO10=/720x405/https://d2g8igdw686xgo.cloudfront.net/82952323_1727091762811796_r.jpeg" alt="" />
		<div class="fundraiser-title">${data.CAPTION}</div>
		<div class="fundraiser-details">
		  <p>Organizer: ${data.ORGANIZER}</p>
		  <p>Target financing: ￥${data.TARGET_FUNDING} | Current funds: ￥${data.CURRENT_FUNDING}</p>
		  <p>City: ${data.CITY}</p>
		  <p>Category: ${data.category_name}</p>
		  <p>Active state: ${data.ACTIVE === 0 ? 'Finished' : 'Underway'}</p>
		</div>
	  </div>
	`
}

// 获取分类 HTML
function dome2(data) {
  return `<option value="${data.CATEGORY_ID}">${data.NAME}</option>`
}

// 获取筹款详情 HTML
function dome3(data) {
  return `
	<div class="container">
		<img src="https://images.gofundme.com/gDgGwtZSszbJzG7qEMvuJXOUO10=/720x405/https://d2g8igdw686xgo.cloudfront.net/82952323_1727091762811796_r.jpeg" />
        <h1 id="title">${data.CAPTION}</h1>
        <div class="details">
            <p><strong>Organizer:</strong> <span id="organizer">${data.ORGANIZER}</span></p>
            <p><strong>Target financing:</strong> <span id="targetFunding">${data.TARGET_FUNDING}</span></p>
            <p><strong>Current funds:</strong> <span id="currentFunding">${data.CURRENT_FUNDING}</span></p>
            <p><strong>City:</strong> <span id="city">${data.CITY}</span></p>
            <p><strong>Category:</strong> <span id="eventStatus">${data.category_name}</span></p>
			<p><strong>Activity:</strong> <span id="category" class="${data.ACTIVE === 0 ? 'categoryActive' : ''}">${data.ACTIVE === 0 ? 'Finished' : 'Underway'}</span></p>
        </div>
        <div class="description">
            <h2>Fundraising description</h2>
            <p id="description">Here is a detailed description of the fundraising activities...</p>
        </div>
        <div class="donateButton">
  			<a href="#" onclick="alert('This feature is under construction')">Donate</a>
		</div>
    </div>
	`
}

// 获取搜索结果
const getSearch = () => {
  const category = document.getElementById('category').value // 分类
  const city = document.getElementById('city').value // 城市
  const organizer = document.getElementById('organizer').value // 组织者

  const params = new URLSearchParams({ category, city, organizer })
  fetch(`http://localhost:3000/api/fundraisers/search?${params}`) // 搜索筹款
    .then(response => response.json())
    .then(data => {
      const fundraisersElement = document.getElementById('fundraisersList') // 使用不同的变量名
      fundraisersElement.innerHTML = `` // 清空当前内容
      if (!data || data.length === 0) {
        // 如果没有数据
        fundraisersElement.innerHTML = `<div style="width:1200px;font-weight: 900;font-size:32px">Nothing was found！</div>`
        return
      }
      // 遍历搜索结果
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        const html = dome(element) // 获取筹款 HTML
        fundraisersElement.insertAdjacentHTML('beforeend', html) // 插入筹款 HTML
      }
      const doms = document.querySelectorAll('.fundraiser-card') // 获取所有筹款卡片
      doms.forEach((item, index) => {
        // 为每个筹款卡片添加点击事件
        item.addEventListener('click', () => go('./particulars.html?id=' + data[index].FUNDRAISER_ID))
      })
    })
}

// 添加搜索按钮的点击事件
document.getElementById('submit')?.addEventListener('click', getSearch)

// 清空搜索框
const clearCheckboxes = () => {
  document.getElementById('category').value = '' // 清空分类
  document.getElementById('city').value = '' // 清空城市
  document.getElementById('organizer').value = '' // 清空组织者
  getSearch() // 获取搜索结果
}

// 添加清空按钮的点击事件
document.getElementById('clear')?.addEventListener('click', clearCheckboxes)
