let posts;

function calcMiddleYofPost(post)
{
    try {
        pos = post.getBoundingClientRect();
        center = (pos.bottom - pos.top) / 2 + pos.top;
        return center;
    } catch (error) {
        console.log(error)
    }
}

function findCurrentCenteredPost(posts)
{
    
}

document.onreadystatechange = () => {
    if (document.readyState === "complete") {
        alert("loaded");
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    posts = document.getElementsByClassName("w-full m-0");
                    posts = Array.from(posts);
                    posts = posts.filter((element) => element.tagName.toLowerCase() == "article");
                }
            });
        });
        
        let observerConfig = {
            childList: true,
            subtree: true
        };

        observer.observe(document.body, observerConfig);

        document.addEventListener('keydown', function(event) {
            if(event.key == " ") {
                event.preventDefault();
                console.log(calcMiddleYofPost(posts[0]));
            }
        });
    }   
}
