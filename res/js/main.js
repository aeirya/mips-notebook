var box = null;

function codeInputChange(e) {
    let file = e.files[0];

    let reader = new FileReader();

    reader.onload = () => {
        $('textarea[pid=' + $(e).attr('pid') + ']')
            .get(0).value = reader.result;
    };

    try {
        reader.readAsText(file);
    } catch (error) { }

    //// e.value = '';
}

$(() => {
    let temp = document.getElementById('box-temp');

    box = temp.cloneNode(true);
    box.classList.remove('visually-hidden');
    box.removeAttribute('id');

    temp.remove();

    hljs.highlightAll();
});
