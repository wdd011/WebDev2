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
		<img class="fundraiser-image" src="./img/image${data.FUNDRAISER_ID}.png" alt="" />
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
  const story = [
    `<h1>STOP EVICTION of Seeing-Eye Dog and Blind Owner. Need Your HELP!</h1>

    <p>Dear neighbors in Hoboken/Newport/Jersey City/LeFrak, please help Marisa Cartiglia keep her beloved guide dog, Dustin. You see them walking every single day… And now they’re being evicted.</p>

    <p>Covid layoffs took Marisa’s job, diabetes took her sight. Please don’t let eviction take her home and her seeing-eye dog.</p>

    <p>If we can raise the money by October 21st, Marisa can pay the court and keep her apartment… and her dog.</p>

    <p>With all this hanging over her, Marisa steadfastly earned even greater accreditation as a Google Data Analytics expert. (She’s applying for Data Analyst, Marketing, and Admin roles, specifically related to her skills in Data Wrangling; Data Visualization; and Data Cleaning, Validation, and Manipulation; as well as Excel, Google Sheets, SQL, Tableau, Python, R, Google Data Studio, and CRM Systems.)</p>

    <p>There are no affordable housing units available anywhere in the entire state of New Jersey, much less in the LeFrak Newport neighborhood of Jersey City, where Marisa and Dustin can safely navigate the walking path and access public transportation.</p>

    <p>She has no family to turn to, having lost her mother to cancer. If you know Marisa, you know she is tough… and smart. She reluctantly agreed to GoFundMe as a measure to give her a little more time to avoid eviction, keep her seeing-eye dog Dustin, and find a new job.</p>

    <p>Please let's help Marisa help herself!</p>`,
    ` <h1>Please Help Donate to Seaside Seabird Sanctuary’s Disaster Relief from Hurricane Helene</h1>

    <p>We are a nonprofit 501c organization in Indian Shores, FL, who rescues, rehabilitates, and releases wild seabirds and other sea life. We are also home to hundreds of resident birds and our hospital and staff who keep it running.</p>

    <p>Our facility was destroyed by Hurricane Helene, which caused over $100,000 in damages and we need to rebuild as quickly as possible to ensure the safety of our birds and wildlife. Pinellas County was the worst county in Florida with flooding and destruction that came with the storm surge from this hurricane. Please consider donating whatever you can to help the cleanup and rebuilding efforts for our sanctuary. We thank you so very much for your continued support and contribution.</p>

    <p>Follow us at <a href="https://www.instagram.com/seaside4thebirds">@seaside4thebirds</a> on Instagram and TikTok for updates.️</p>

    <h3>Update:</h3>
    <p>We started a wishlist of supplies and items we will need to clean and rebuild.</p>
    <p><a href="#">Seaside4thebirds Wishlist</a></p>
    <p>Feel free to drop off any supplies at our sanctuary if possible. Thank you for your continued support.</p>`,
    `<h1>Support Wildlife, Inc. After Hurricane Helene</h1>

    <p>For nearly 40 years, Gail and Ed Straight have passionately and tirelessly organized Wildlife, Inc. Education & Rehabilitation Center, a volunteer-based non-profit which relies solely on private donations and receives NO funding from local, state, or federal governments. They have rescued, rehabilitated and aimed to release an estimated 150,000 injured or orphaned wildlife. They are some of the most selfless and dedicated people I know, who have made tremendous sacrifices in order to serve the wildlife in their community.</p>

    <p>On September 26th, their Anna Maria Island location was severely damaged by Hurricane Helene. Risking their own safety, they were miraculously able to keep ALL of the wildlife safe, however their home, wildlife hospital, and both of their vehicles are a total loss. I am hoping to spread their story and provide a platform for their loyal supporters to help them in what I am sure will be a very long and challenging road of rebuilding their lives.</p>

    <p>Thank you for considering a donation, any amount is hugely appreciated by these deserving animal advocates.</p>

    <p>You can find more information on their website: <a href="https://wildlifeinc.org" target="_blank">https://wildlifeinc.org</a> or visit their Instagram at <a href="https://www.instagram.com/wildlife_inc" target="_blank">@wildlife_inc</a>.</p>`,
    `<h1>Help Rebuild Unicoi County Animal Shelter</h1>

    <p>Unicoi County Animal Shelter went through a devastating time. As the animals all got out safe, our shelter is a different story. We lost everything except some cans of dog and cat food.</p>

    <p>We are starting this fundraiser to try to get our shelter back up and running as soon as possible. Any help you can provide would be greatly appreciated.</p>`,
    `<h1>Help Clementine Get the Medical Care She Needs</h1>

    <p>Hello everyone, my name is Jaime and I am sweet Clementine’s human mama.</p>

    <p>Clementine came to me on August 2, 2023, as a foster after surviving on the city streets for likely eight years. It was now her time to live the rest of her life safely indoors. At that time, I didn’t know that I would be her fur-ever home of choice. On her one-year foster-versary, I made the decision to officially allow this 9-year-old ginger to adopt me!</p>

    <p>Unfortunately, Clementine is now facing some health issues. We spent Saturday, September 21st, in urgent care, running tests and receiving some treatment. While that has helped some of the issues, Clementine is facing other challenges and will require further visits to the vet, testing, and treatment.</p>

    <p>Typically, I wouldn’t ask for help, but Clem was not a planned adoption and I was not financially prepared for the rising costs that would come so soon after her adoption.</p>

    <p>Any and all help with her medical costs are greatly appreciated. Thank you for loving Clementine as much as I do!</p>`,
  ]
  return `
	<div class="container">
		<img src="./img/image${data.FUNDRAISER_ID}.png" />
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
            <p id="description">${story[data.FUNDRAISER_ID - 1]}</p>
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
