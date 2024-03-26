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
    coordsPostsCentered = posts.map(calcMiddleYofPost);

    let postsCentered = [];
    posts.forEach((element, index) => {
        postsCentered[index] = {post: element, yCenter: coordsPostsCentered[index]};
    });
    postsInView = postsCentered.filter((element) => {
        return (element.yCenter > window.scrollY) && (element.yCenter < (window.innerHeight + window.scrollY));
    });
    console.log((postsCentered[0].yCenter > window.scrollY) && (postsCentered[0].yCenter < (window.innerHeight + window.scrollY)))
    console.log(postsInView);
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
                findCurrentCenteredPost(posts);
            }
        });
    }   
}
