marked.setOptions({
  breaks: true
});

async function loadBlog(){
    
    //記事の追加場所をidで取得
    const container = document.getElementById('blogcontent')

    if (typeof blog_articles === 'undefined'){
        console.error("list.js error")
        return 
    }

    // blog 数を取得してループ処理を行う
    for (const article of blog_articles){
        try {
            const response = await fetch(`./data/${article.file}`);

            if(!response.ok){
                console.error("file not found:", article.file);
                continue;
            }

            const mdText = await response.text();

            const entrydiv = document.createElement('div');
            entrydiv.className = 'blog-entry';

            const readingTime = calcReadingTime(mdText);
            //data のみ結合
            entrydiv.innerHTML =
            `<h2 class="blog-date">
                <span class="date">
                <img src="../SVG/calendarwhite.svg" alt="date" class="calendar-icon">
                ${article.date}
                </span>

                <span class="reading-time">
                <img src="../SVG/clockwhite.svg" alt="clock" class="clock-icon">
                ${readingTime} min read
                </span>
            </h2>
            <p>${marked.parse(mdText)}</p>`;

            container.appendChild(entrydiv);
        }catch (err){
            console.error("article load error: ", article.file, err);
        }
    }
}

function calcReadingTime(text) {
  const plainText = text
    .replace(/[#>*_`\-\[\]()]/g, '') // Markdown記号を除去
    .replace(/\s+/g, '');            // 空白除去

  const charsPerMinute = 400; //400文字 per min を基準とする
  const minutes = Math.max(1, Math.ceil(plainText.length / charsPerMinute));

  return minutes;
}


window.onload = loadBlog;