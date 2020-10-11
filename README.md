# Purpose
一個簡陋的統計工具：計算申請攀登玉山, 當天卻沒到的人數

# Description
http://mqjing.blogspot.com/2020/10/typescript.html <br>
最近國家公園希望把所有山屋的申請全部變成抽籤制, 我想在登山客履約問題沒有解決前, 抽籤制度只會讓想登山的人變得機率更低.  在罰則低而且沒有訂金制度下, 部分遊客任意浪費了登山名額的寶貴資源. 影響了其他人的權益.

因此, 我花了 30 分鐘寫的簡陋程式, 過濾出玉山國家公園每日未履約遊客 (佔位) 統計. 

看一下統計圖表, 想一想
如果你是一位經營旅館的老闆, 你可以接受這樣不履約的人數嗎? 
為什麼玉山國家公園可以接受? 

我想原因是這損失(痛) 不是直接反映在管理者身上, 而是讓真正想登山的人承擔.   
反思, 為何我們可以接受這樣的經營績效？


# Install
npm install

# Build
npm run build

# Run
npm start

# Output
## Console
https://docs.google.com/presentation/d/1EaD_j7zTJxafKlnpM6kgstp6ogT7AhMX0zUUOhbznpU/edit?usp=sharing

<image src="https://1.bp.blogspot.com/-547i2SXObZ4/X4Mu_nYDDBI/AAAAAAAAiIU/XuvzJZOYtKglL_h7qFBGiiE3ifp4_2m6QCLcBGAsYHQ/s1566/Screen%2BShot%2B2020-10-12%2Bat%2B12.12.31%2BAM.png">

## File
data_people_not_present.csv: 申請獲准攀登玉山, 結果當天卻沒來的所有人數資料
<image src="https://1.bp.blogspot.com/-45b9ikEnvW8/X4MxwcnmzDI/AAAAAAAAiIg/Dj5V5RDC4DAb1-u3uLF8_VuF3okcHCR5wCLcBGAsYHQ/s2048/Screen%2BShot%2B2020-10-12%2Bat%2B12.23.53%2BAM.png">



# Others
tsc --init
npm init 
npm i @types/node
npm i https
