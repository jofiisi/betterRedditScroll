let posts;
let currentContender = 0;

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
        postsCentered[index] = {post: element, yCenter: coordsPostsCentered[index] + window.scrollY};
    });
    postsInView = postsCentered.filter((element) => {
        return (element.yCenter > window.scrollY) && (element.yCenter < (window.innerHeight + window.scrollY));
    });

    let currentContenderDiff = 0;
    let currentCandidateDiff = 0;
    currentContender = 0;

    currentContenderDiff = Math.abs(window.innerHeight / 2 + scrollY - postsInView[0].yCenter);

    for (let i = 0; i < postsInView.length; i++)
    {
        currentCandidateDiff = Math.abs(window.innerHeight / 2 + scrollY - postsInView[i].yCenter);
        if(currentCandidateDiff < currentContenderDiff)
        {
            currentContenderDiff = currentCandidateDiff;
            currentContender = i;
        }
    }
    return postsInView;
}

function scrollToNextPostInView(postsInView)
{

    if(postsInView.length != 1)
    {
        window.scroll(0, postsInView[currentContender].yCenter);

    }else{
        for (let i = 0; i < posts.length; i++)
        {
            if(posts[i].ariaLabel == postsInView[currentContender].post.ariaLabel)
            {
                console.log("1 in view");
                window.scroll(0, calcMiddleYofPost(posts[i + 1]));
                break;
            }
        }
    }
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
                let postsInView = findCurrentCenteredPost(posts);
                scrollToNextPostInView(postsInView);
            }
        });
    }   
}
