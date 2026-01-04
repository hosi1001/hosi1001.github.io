async function loadBlog(){
    //記事の追加場所をidで取得
    const container = document.getElementById('entry-container')

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

            // date を見出しにして、mdの内容のテキスト部分のみ結合させる
            entrydiv.innerHTML = `<h2>${article.date}</h2>` + `<p>${marked.parse(mdText)}</p>`;
            // entrydiv.innerHTML = `<h2>${article.date}</h2>` + marked.parse(mdText);
            container.appendChild(entrydiv);
        }catch (err){
            console.error("article load error: ", article.file, err);
        }
    }
}

window.onload = loadBlog;