let form = document.forms.fetchForm;
form.addEventListener('submit', function(e){
    e.preventDefault();
    let url = form.elements.url.value;
    console.log("submit", form.action, form.method, url);
    ajax(form.action, form.method, {url})
    .then(result => {
        console.log('-> ', result);
    }).catch((err) =>{
        console.log(err);
    })
});


function ajax(url, method, data){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        console.log(serialize(data));
        xhr.send(serialize(data));
        xhr.addEventListener('readystatechange', function(){
            if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve(xhr.responseText);
                }
            }
        })
    })
}

function serialize(data){
    return Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}