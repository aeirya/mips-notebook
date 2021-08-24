function readFile(path) {
    return new Promise(resolve => {
        fetch(path).then(file => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            file.blob().then(blob => {
                reader.readAsText(blob);
            });
        });
    });
}

function addElements(asg, text) {
    text = text.replaceAll('<m-code>', '<pre><code>');
    text = text.replaceAll('</m-code>', '</code></pre>');

    text = text.replaceAll('<m-text>', '<p>');
    text = text.replaceAll('</m-text>', '</p>');

    asg.innerHTML = text;

    document.querySelectorAll('m-box').forEach(obj => {
        console.log('hi');

        let problem = $(obj).attr('problem');
        let value = $(obj).text();
        obj.remove();

        let e = asg.appendChild(box.cloneNode(true));
        e.querySelectorAll('*[pid]').forEach(object =>
            object.setAttribute('pid', problem));
        e.querySelector('textarea').value = value;
    });


    hljs.highlightAll();
}

var item;
$(() => {
    document.querySelectorAll('div[asg]').forEach(obj => {
        let $this = $(obj);

        let asg = $this.attr('asg');
        readFile(asg).then(text => {
            addElements($this.get(0), text);
        });
    });
});

