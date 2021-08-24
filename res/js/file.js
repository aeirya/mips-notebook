function readFile(path) {
    return new Promise(resolve => {
        fetch(path).then(file => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            }

            file.blob().then(blob => {
                reader.readAsText(blob);
            });
        });
    });
}

var item;
$(() => {
    document.querySelectorAll('div[asg]').forEach((obj) => {
        let $this = $(obj);

        let asg = $this.attr('asg');
        readFile(asg).then(text => {
            $this.html(text);
        });
    });
});

